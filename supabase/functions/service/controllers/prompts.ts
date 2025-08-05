import { Context } from "jsr:@hono/hono";

import { StatusCodes } from "npm:http-status-codes";
import { v4 as uuid } from "npm:uuid";

import Database from "../models/database.ts";
import Prompt from "../models/prompt.ts";
import Term from "../models/terms.ts";
import PromptTerm from "../models/prompt_terms.ts";
import {
  PromptDeleteParams,
  PromptGetAllQuery,
  PromptGetParams,
  PromptPatchBody,
  PromptPatchParams,
  PromptPostBody,
} from "../schemas/prompts.ts";
import PromptSearch from "../models/prompt_search.ts";
import { saveAlgolia } from "../services/algolia.ts";
import { throwApiError } from "../utils/error.ts";

const getPrompt = async (c: Context) => {
  const { promptId } = c.req.param() as unknown as PromptGetParams;

  const db = Database.instance;

  const prompt = await db.queryOne<Prompt>(
    `SELECT * FROM prompts WHERE id = $1`,
    [promptId],
  );
  if (!prompt) {
    throwApiError(
      StatusCodes.NOT_FOUND,
      "The requested prompt could not be found",
      "Resource does not exist",
      { promptId }
    );
  }

  return c.json(prompt, StatusCodes.OK);
};

const getAllPrompts = async (c: Context) => {
  const db = Database.instance;
  const { limit, offset, order, sortBy } = c.req
    .query() as unknown as PromptGetAllQuery;

  const prompts = await db.query<Prompt>(
    `SELECT * FROM prompts ORDER BY ${sortBy} ${order} LIMIT $1 OFFSET $2`,
    [limit, offset],
  );

  c.status(StatusCodes.OK);
  return c.json(prompts, StatusCodes.OK);
};

const createPrompt = async (c: Context) => {
  const { content, isPublic, name, parentPromptId, termIds } = await c.req.json<
    PromptPostBody
  >();

  const user = c.get("user");

  const db = Database.instance;

  // Create the prompt
  await db.withTransaction(async (transaction) => {
    let parentPrompt = null;
    if (parentPromptId) {
      parentPrompt = await db.queryOne<Prompt>(
        `SELECT * FROM prompts WHERE id = $1`,
        [parentPromptId],
      );
      if (!parentPrompt) {
        throwApiError(
          StatusCodes.BAD_REQUEST,
          "Invalid parent prompt reference",
          "Parent prompt does not exist",
          { parentPromptId }
        );
      }
    }

    // Get all term and taxonomy details
    const terms = await db.query<Term & { taxonomyName: string }>(
      `SELECT terms.*, taxonomys.name AS taxonomy_name FROM terms INNER JOIN taxonomys ON taxonomys.id = terms.taxonomy_id WHERE terms.id IN ($1)`,
      [termIds],
    );

    if (terms.length !== termIds.length) {
      const foundTermIds = terms.map(t => t.id);
      const missingTermIds = termIds.filter(id => !foundTermIds.includes(id));
      throwApiError(
        StatusCodes.BAD_REQUEST,
        "One or more term references are invalid",
        "Referenced terms do not exist",
        { missingTermIds, providedTermIds: termIds }
      );
    }

    const newPrompt = new Prompt();
    newPrompt.id = uuid();
    newPrompt.createdAt = new Date();
    newPrompt.createdBy = user.id;
    newPrompt.isLatestVersion = !!parentPrompt;
    newPrompt.isPublic = isPublic;
    newPrompt.name = name;
    newPrompt.parentPromptId = parentPromptId;
    newPrompt.updatedAt = new Date();
    newPrompt.updatedBy = user.id;
    newPrompt.version = parentPrompt ? parentPrompt.version + 1 : 1;

    await db.insert("prompts", newPrompt, [], transaction);

    // Save prompt term relationship
    const newPromptTerms = termIds.map((termId) => {
      const promptTerm = new PromptTerm();
      promptTerm.promptId = newPrompt.id;
      promptTerm.termId = termId;
      promptTerm.createdAt = new Date();

      return promptTerm;
    });

    await db.insertMultiple("prompt_terms", newPromptTerms, [], transaction);

    // Save the prompt in algolia
    const newPromptSearch = new PromptSearch();
    newPromptSearch.id = newPrompt.id;
    newPromptSearch.createdAt = newPrompt.createdAt;
    newPromptSearch.createdBy = newPrompt.createdBy;
    newPromptSearch.isLatestVersion = newPrompt.isLatestVersion;
    newPromptSearch.isPublic = newPrompt.isPublic;
    newPromptSearch.name = newPrompt.name;
    newPromptSearch.content = content;
    newPromptSearch.parentPromptId = newPrompt.parentPromptId;
    newPromptSearch.updatedAt = newPrompt.updatedAt;
    newPromptSearch.updatedBy = newPrompt.updatedBy;
    newPromptSearch.version = newPrompt.version;
    newPromptSearch.terms = terms.reduce<Record<string, string[]>>(
      (acc, term) => {
        if (!acc[term.taxonomyName]) {
          acc[term.taxonomyName] = [];
        }
        acc[term.taxonomyName].push(term.name);
        return acc;
      },
      {},
    );

    await saveAlgolia(newPromptSearch);
  });

  return c.json({ success: true }, StatusCodes.CREATED);
};

const patchPrompt = async (c: Context) => {
  const { promptId } = c.req.param() as unknown as PromptPatchParams;
  const { name, content, termIds } = await c.req.json<
    PromptPatchBody
  >();

  const db = Database.instance;

  // Update the prompt
  await db.withTransaction(async (transaction) => {
    const existingPrompt = await db.queryOne<Prompt>(
      `SELECT * FROM prompts WHERE id = $1`,
      [promptId],
    );
    if (!existingPrompt) {
      throwApiError(
        StatusCodes.NOT_FOUND,
        "The prompt to update could not be found",
        "Resource does not exist",
        { promptId }
      );
    }
    const user = c.get("user");

    // Get all term and taxonomy details
    const terms = await db.query<Term & { taxonomyName: string }>(
      `SELECT terms.*, taxonomys.name AS taxonomy_name FROM terms INNER JOIN taxonomys ON taxonomys.id = terms.taxonomy_id WHERE terms.id IN ($1)`,
      [termIds],
    );

    if (terms.length !== termIds.length) {
      const foundTermIds = terms.map(t => t.id);
      const missingTermIds = termIds.filter(id => !foundTermIds.includes(id));
      throwApiError(
        StatusCodes.BAD_REQUEST,
        "One or more term references are invalid",
        "Referenced terms do not exist",
        { missingTermIds, providedTermIds: termIds }
      );
    }

    // Get terms associated with existing prompt
    const existingPromptTerms = await db.query<PromptTerm>(
      `SELECT * FROM prompt_terms WHERE prompt_id = $1`,
      [promptId],
    );

    existingPrompt.name = name;
    existingPrompt.updatedAt = new Date();
    existingPrompt.updatedBy = user.id;
    await db.update(
      "prompts",
      existingPrompt,
      ["name", "updatedAt"],
      transaction,
    );

    // Identify terms to be deleted
    const termsToDelete = existingPromptTerms.filter(
      (term) => !termIds.includes(term.termId),
    );
    if (termsToDelete.length) {
      await Promise.all(
        termsToDelete.map((term) =>
          db.remove("prompt_terms", term, transaction)
        ),
      );
    }

    // Identify terms to be added
    const termsToAdd = termIds.filter(
      (termId) => !existingPromptTerms.find((term) => term.termId === termId),
    );
    if (termsToAdd.length) {
      const newPromptTerms = termsToAdd.map((termId) => {
        const promptTerm = new PromptTerm();
        promptTerm.promptId = promptId;
        promptTerm.termId = termId;
        promptTerm.createdAt = new Date();
        return promptTerm;
      });
      await db.insertMultiple("prompt_terms", newPromptTerms, [], transaction);
    }

    // Save the prompt in algolia
    const newPromptSearch = new PromptSearch();
    newPromptSearch.id = existingPrompt.id;
    newPromptSearch.createdAt = existingPrompt.createdAt;
    newPromptSearch.createdBy = existingPrompt.createdBy;
    newPromptSearch.isLatestVersion = existingPrompt.isLatestVersion;
    newPromptSearch.isPublic = existingPrompt.isPublic;
    newPromptSearch.name = existingPrompt.name;
    newPromptSearch.content = content;
    newPromptSearch.parentPromptId = existingPrompt.parentPromptId;
    newPromptSearch.updatedAt = existingPrompt.updatedAt;
    newPromptSearch.version = existingPrompt.version;
    newPromptSearch.terms = terms.reduce<Record<string, string[]>>(
      (acc, term) => {
        if (!acc[term.taxonomyName]) {
          acc[term.taxonomyName] = [];
        }
        acc[term.taxonomyName].push(term.name);
        return acc;
      },
      {},
    );

    await saveAlgolia(newPromptSearch);
  });

  return c.json({ success: true }, StatusCodes.CREATED);
};

const deletePrompt = async (c: Context) => {
  const { promptId } = c.req.param() as unknown as PromptDeleteParams;

  const db = Database.instance;

  // Delete the prompt
  await db.withTransaction(async (transaction) => {
    const existingPrompt = await db.queryOne<Prompt>(
      `SELECT * FROM prompts WHERE id = $1`,
      [promptId],
    );
    if (!existingPrompt) {
      throwApiError(StatusCodes.NOT_FOUND, 
        "Cannot delete prompt: Prompt not found",
        "NO_PROMPT_FOUND",
        { promptId }
      );
    }

    // Delete associated prompt terms
    await db.query(
      `DELETE FROM prompt_terms WHERE prompt_id = $1`,
      [promptId],
      transaction,
    );

    // Delete the prompt
    await db.query(
      `DELETE FROM prompts WHERE id = $1`,
      [promptId],
      transaction,
    );

    // TODO: Remove the prompt from Algolia
  });

  return c.json({ success: true }, StatusCodes.OK);
};

export { createPrompt, deletePrompt, getAllPrompts, getPrompt, patchPrompt };
