import { Context } from "jsr:@hono/hono";
import { StatusCodes } from "npm:http-status-codes";
import { v7 as uuid } from "npm:uuid";
import Term from "../models/terms.ts";
import Database from "../models/database.ts";
import {
  TermDeleteParams,
  TermGetParams,
  TermPatchBody,
  TermPatchParams,
  TermPostBody,
} from "../schemas/terms.ts";
import { throwApiError } from "../utils/error.ts";

const getTerm = async (c: Context) => {
  const { termId } = c.req.param() as unknown as TermGetParams;

  const db = Database.instance;

  const term = await db.queryOne<Term>(
    `SELECT * FROM terms WHERE id = $1`,
    [termId],
  );
  if (!term) {
    throwApiError(
      StatusCodes.NOT_FOUND,
      "The requested term could not be found",
      "TERM_NOT_FOUND",
      { termId }
    );
  }

  return c.json(term, StatusCodes.OK);
};

const getAllTerms = async (c: Context) => {
  const db = Database.instance;

  const terms = await db.query<Term>(`SELECT * FROM terms`);

  c.status(StatusCodes.OK);
  return c.json(terms, StatusCodes.OK);
};

const createTerm = async (c: Context) => {
  const { name, taxonomyId } = await c.req.json<TermPostBody>();

  const db = Database.instance;

  const newTerm = new Term();
  newTerm.id = uuid();
  newTerm.name = name;
  newTerm.taxonomyId = taxonomyId;
  newTerm.createdAt = new Date();
  newTerm.updatedAt = new Date();

  await db.insert("terms", newTerm);

  return c.json(newTerm, StatusCodes.CREATED);
};

const patchTerm = async (c: Context) => {
  const { termId } = c.req.param() as unknown as TermPatchParams;
  const { name } = await c.req.json<TermPatchBody>();

  const db = Database.instance;

  const existingTerm = await db.queryOne<Term>(
    `SELECT * FROM terms WHERE id = $1`,
    [termId],
  );
  if (!existingTerm) {
    throwApiError(
      StatusCodes.NOT_FOUND,
      "Cannot update term: Term not found",
      "TERM_NOT_FOUND",
      { termId }
    );
  }

  if (name) {
    existingTerm.name = name;
  }
  existingTerm.updatedAt = new Date();
  await db.update("terms", existingTerm, ["name", "updatedAt"]);

  return c.json(existingTerm, StatusCodes.OK);
};

const deleteTerm = async (c: Context) => {
  const { termId } = c.req.param() as unknown as TermDeleteParams;

  const db = Database.instance;

  const existingTerm = await db.queryOne<Term>(
    `SELECT * FROM terms WHERE id = $1`,
    [termId],
  );
  if (!existingTerm) {
    throwApiError(
      StatusCodes.NOT_FOUND,
      "Cannot delete term: Term not found",
      "TERM_NOT_FOUND",
      { termId }
    );
  }

  await db.remove("terms", existingTerm);

  return c.status(StatusCodes.NO_CONTENT);
};

export { createTerm, deleteTerm, getAllTerms, getTerm, patchTerm };
