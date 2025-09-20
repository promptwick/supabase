import { Context } from 'jsr:@hono/hono';
import { QueryArguments } from 'jsr:@db/postgres';

import { StatusCodes } from 'npm:http-status-codes';
import { v7 as uuid } from 'npm:uuid';

import Database from '../models/database.ts';
import Prompt from '../models/prompt.ts';
import PromptTerm from '../models/prompt_term.ts';
import Term from '../models/term.ts';
import { CreatePromptBody, DeletePromptParams, EditPromptBody, EditPromptParams, GetAllPromptsQuery, GetPromptParams } from '../schemas/prompt.ts';
import { throwApiError } from '../utils/error.ts';

/**
 * Retrieves a prompt by its ID from the database and returns it as a JSON response.
 *
 * @param c - The request context containing parameters and utilities for handling the request.
 * @returns A Promise that resolves to a JSON response containing the prompt data and a 200 OK status.
 * @throws {ApiError} If the prompt with the specified ID does not exist, throws an error with a 404 Not Found status.
 */
export const getPrompt = async (c: Context) => {
	const { promptId } = c.get('params') as GetPromptParams;

	const user = c.get('user');

	const db = Database.instance;

	const query = `
		SELECT 
			p.id, 
			p.name, 
			p.prompt, 
			p.is_public, 
			p.is_latest_version,
			p.parent_prompt_id, 
			p.version, 
			p.locale_id,
			p.count_reaction_up,
			p.count_reaction_down,
			p.count_favorite,
			p.created_at, 
			p.updated_at,
			CASE WHEN MIN(upf.user_id::TEXT) IS NOT NULL THEN true ELSE false END AS is_favorited,
			MIN(upr.reaction_type) AS reaction_type,
			JSON_AGG(JSON_BUILD_OBJECT(
				'id', terms.id,
				'name', terms.name,
				'taxonomy_id', terms.taxonomy_id
			)) AS terms

			FROM prompts AS p
			LEFT JOIN prompt_terms AS pterms ON p.id = pterms.prompt_id
			LEFT JOIN terms AS terms ON pterms.term_id = terms.id
			LEFT JOIN user_prompt_favorites AS upf ON p.id = upf.prompt_id 
				AND upf.user_id = $USER_ID
			LEFT JOIN user_prompt_reactions AS upr ON p.id = upr.prompt_id 
				AND upr.user_id = $USER_ID
			WHERE p.id = $PROMPT_ID
				AND p.deleted_at IS NULL
			GROUP BY p.id
		`;

	const prompt = await db.queryOne<Prompt>(Prompt, query, { prompt_id: promptId, user_id: user.id });
	if (!prompt) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'Prompt Not Found',
			{ prompt_id: promptId, user_id: user.id },
		);
	}

	return c.json({ data: prompt }, StatusCodes.OK);
};

/**
 * Retrieves a list of prompts from the database based on various query parameters.
 *
 * This function supports filtering, searching, sorting, and pagination of prompts.
 * It also supports filtering by public/private status, associated term IDs, search queries,
 * and whether the prompt is favorited by the current user.
 *
 * @param c - The request context containing query parameters and user information.
 *   - `limit`: The maximum number of prompts to return.
 *   - `offset`: The number of prompts to skip for pagination.
 *   - `order`: The sort order ('ASC' or 'DESC').
 *   - `sortBy`: The field to sort by.
 *   - `termIds`: An array of term IDs to filter prompts by associated terms.
 *   - `isPublic`: If true, only public prompts are returned; if false, only private prompts created by the user are returned.
 *   - `searchQuery`: A string to search for in prompt names or content.
 *   - `isFavorited`: If true, only prompts favorited by the user are returned.
 *
 * @returns A JSON response containing an array of prompts matching the query parameters.
 *
 * @remarks
 * - Each prompt includes its associated terms and a flag indicating if it is favorited by the user.
 * - Only prompts that are public or created by the current user are returned unless otherwise filtered.
 * - Requires the user to be authenticated and available in the context.
 */
export const getAllPrompts = async (c: Context) => {
	const db = Database.instance;
	const {
		limit: limitRaw = '20',
		offset: offsetRaw = '0',
		order = 'desc',
		sortBy = 'created_at',
		termIds,
		isPublic,
		searchQuery,
		isFavorited,
	} = c.get('query') as unknown as GetAllPromptsQuery;

	const limit = Number(limitRaw);
	const offset = Number(offsetRaw);

	const user = c.get('user');

	let query = `
	SELECT 
		COUNT(*) OVER() AS total_count,
		p.id, 
		p.name, 
		p.prompt, 
		p.is_public, 
		p.is_latest_version,
		p.parent_prompt_id, 
		p.version, 
		p.locale_id,
		p.count_reaction_up,
		p.count_reaction_down,
		p.count_favorite,
		p.created_at, 
		p.updated_at,
		CASE WHEN MIN(upf.user_id::TEXT) IS NOT NULL THEN true ELSE false END AS is_favorited,
		MIN(upr.reaction_type) AS reaction_type,
		JSON_AGG(JSON_BUILD_OBJECT(
			'id', terms.id,
			'name', terms.name,
			'taxonomy_id', terms.taxonomy_id
		)) AS terms

		FROM prompts AS p
		LEFT JOIN prompt_terms AS pterms ON p.id = pterms.prompt_id
		LEFT JOIN terms AS terms ON pterms.term_id = terms.id
		LEFT JOIN user_prompt_favorites AS upf ON p.id = upf.prompt_id 
			AND upf.user_id = $USER_ID
		LEFT JOIN user_prompt_reactions AS upr ON p.id = upr.prompt_id 
			AND upr.user_id = $USER_ID
		WHERE p.deleted_at IS NULL
			AND p.is_latest_version = true`;

	const params: QueryArguments = {
		limit,
		offset,
		order,
		sortBy,
		user_id: user.id,
	};

	if (isPublic !== undefined) {
		if (isPublic) {
			query = `${query} AND p.is_public = true`;
		} else {
			query = `${query} AND p.created_by = $USER_ID`;
		}
	} else {
		query = `${query} AND (p.is_public = true OR p.created_by = $USER_ID)`;
	}

	if (termIds && termIds.length > 0) {
		const termPlaceholders = termIds.map((_, index) => `$TERM_ID_${index}`).join(', ');
		query = `${query} AND p.id IN (
			SELECT prompt_id
			FROM prompt_terms
			WHERE term_id IN (${termPlaceholders})
			GROUP BY prompt_id
			HAVING COUNT(DISTINCT term_id) = ${termIds.length}
		)`;
		termIds.forEach((termId, index) => {
			params[`term_id_${index}`] = termId;
		});
	}

	if (searchQuery) {
		query = `${query} AND (
			p.name ILIKE $SEARCH_QUERY 
			OR p.prompt ILIKE $SEARCH_QUERY
		)`;
		params.search_query = `%${searchQuery}%`;
	}

	if (isFavorited) {
		query = `${query} AND upf.user_id IS NOT NULL`;
	}

	query = `${query}
	GROUP BY p.id
	ORDER BY p.${sortBy} ${order}
	LIMIT $LIMIT
	OFFSET $OFFSET
  `;

	const prompts = await db.query<Prompt & { isFavorited: boolean; terms: Array<Term>; totalCount: number }>(
		class extends Prompt {
			isFavorited!: boolean;
			terms!: Array<Term>;
			totalCount!: number;
		},
		query,
		params,
	);

	if (prompts.length === 0) {
		return c.json({
			count: 0,
			data: [],
		}, StatusCodes.OK);
	}

	const totalCount = Number(prompts[0].totalCount);

	// Post-process prompts
	const processedPrompts = prompts.map((prompt) => {
		const { totalCount: _totalCount, ...rest } = prompt;
		const terms = prompt.terms.filter((term) => !!term.id);
		return {
			...rest,
			terms,
		};
	});

	return c.json({
		count: totalCount,
		data: processedPrompts,
		prevOffset: offset > 0 ? Math.max(0, offset - limit) : undefined,
		nextOffset: prompts.length > 0 && (offset + limit) < totalCount ? offset + limit : undefined,
	}, StatusCodes.OK);
};

/**
 * Handles the creation of a new prompt, including validation, database insertion,
 * term association, and indexing in Algolia search.
 *
 * This function expects a JSON body containing the prompt details, validates the
 * parent prompt (if provided), verifies term references, creates the prompt and
 * its term relationships in the database, and indexes the new prompt in Algolia.
 * All operations are performed within a database transaction to ensure consistency.
 *
 * @param c - The request context containing the user and request data.
 * @returns A JSON response indicating success, with HTTP status 201 (Created).
 *
 * @throws {ApiError} If the parent prompt or any term references are invalid.
 */
export const createPrompt = async (c: Context) => {
	const { prompt, isPublic, name, parentPromptId, localeId, termIds } = c.get('body') as CreatePromptBody;

	const user = c.get('user');

	const db = Database.instance;

	let promptId: string;

	await db.withTransaction(async (transaction) => {
		let parentPrompt = null;
		if (parentPromptId) {
			parentPrompt = await db.queryOne<Prompt>(
				Prompt,
				`
					SELECT * 
					FROM prompts 
					WHERE id = $1
				`,
				[parentPromptId],
				transaction,
			);
			if (!parentPrompt || (!parentPrompt.isPublic && parentPrompt.createdBy !== user.id)) {
				throwApiError(
					StatusCodes.BAD_REQUEST,
					'Invalid parent prompt reference',
				);
			}
		}

		// Get all term and taxonomy details
		const terms = await db.query<Term & { taxonomyName: string }>(
			class extends Term {
				taxonomyName!: string;
			},
			`
				SELECT 
					terms.*, 
					taxonomies.name AS taxonomy_name 
				FROM terms
				INNER JOIN taxonomies ON taxonomies.id = terms.taxonomy_id
				WHERE terms.id = ANY($1)
			`,
			[termIds],
			transaction,
		);

		if (terms.length !== termIds.length) {
			throwApiError(
				StatusCodes.BAD_REQUEST,
				'One or more term references are invalid',
			);
		}

		const newPrompt = new Prompt();
		newPrompt.id = uuid();
		newPrompt.createdAt = new Date();
		newPrompt.createdBy = user.id;
		newPrompt.isLatestVersion = true;
		newPrompt.isPublic = isPublic;
		newPrompt.name = name;
		newPrompt.parentPromptId = parentPromptId ?? null;
		newPrompt.prompt = prompt;
		newPrompt.localeId = localeId;
		newPrompt.updatedAt = new Date();
		newPrompt.updatedBy = user.id;
		newPrompt.version = parentPrompt ? parentPrompt.version + 1 : 1;

		await db.insert('prompts', newPrompt, [], transaction);

		if (parentPrompt && !parentPrompt.isPublic && parentPrompt.isLatestVersion) {
			// If the parent prompt is private and the latest version, mark it as not latest
			parentPrompt.isLatestVersion = false;
			parentPrompt.updatedAt = new Date();
			parentPrompt.updatedBy = user.id;
			await db.update('prompts', parentPrompt, ['isLatestVersion', 'updatedAt', 'updatedBy'], transaction);
		}

		// Associate terms with the new prompt
		if (terms.length) {
			// Save prompt term relationship
			const newPromptTerms = termIds.map((termId) => {
				const promptTerm = new PromptTerm();
				promptTerm.promptId = newPrompt.id;
				promptTerm.termId = termId;
				promptTerm.createdAt = new Date();
				return promptTerm;
			});

			await db.insertMultiple('prompt_terms', newPromptTerms, [], transaction);
		}

		promptId = newPrompt.id;
	});

	if (!promptId!) {
		throwApiError(
			StatusCodes.INTERNAL_SERVER_ERROR,
			'Failed to create new prompt',
		);
	}

	return c.json({ id: promptId }, StatusCodes.CREATED);
};

/**
 * Updates an existing prompt's details and associated terms.
 *
 * This function validates the prompt's existence and ownership, checks term references,
 * updates the prompt's name and/or content, and manages prompt-term relationships.
 *
 * @param c - The request context containing the user, prompt ID, and update data.
 * @returns A 204 No Content response on success.
 * @throws {ApiError} If the prompt does not exist, is not owned by the user, or term references are invalid.
 */

export const editPrompt = async (c: Context) => {
	const { promptId } = c.get('params') as EditPromptParams;
	const { name, prompt, termIds } = c.get('body') as EditPromptBody;

	const user = c.get('user');

	const db = Database.instance;

	// Validate existing prompt
	const promptQuery = `
		SELECT 
			id, 
			name, 
			prompt, 
			is_public, 
			is_latest_version, 
			parent_prompt_id, 
			version, 
			locale_id, 
			count_reaction_up, 
			count_reaction_down, 
			count_favorite, 
			created_at, 
			updated_at, 
			created_by, 
			updated_by 
		FROM prompts 
		WHERE id = $1 
			AND deleted_at IS NULL
	`;
	const existingPrompt = await db.queryOne<Prompt>(
		Prompt,
		promptQuery,
		[promptId],
	);

	if (!existingPrompt || existingPrompt.createdBy !== user.id) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'The prompt to update could not be found',
		);
	}

	if (termIds && termIds.length) {
		// Validate term IDs
		const termsQuery = `
			SELECT 
				id, 
				name, 
				taxonomy_id, 
				locale_id, 
				created_at, 
				updated_at 
			FROM terms 
			WHERE id = ANY($1) 
				AND deleted_at IS NULL
		`;
		const validTermIds = await db.query<Term>(Term, termsQuery, [termIds]);
		if (validTermIds.length !== termIds.length) {
			throwApiError(
				StatusCodes.BAD_REQUEST,
				'One or more term references are invalid',
			);
		}
	}

	await db.withTransaction(async (transaction) => {
		let doUpdate = false;

		if (name) {
			existingPrompt.name = name;
			doUpdate = true;
		}

		if (prompt) {
			existingPrompt.prompt = prompt;
			doUpdate = true;
		}

		if (doUpdate) {
			existingPrompt.updatedAt = new Date();
			existingPrompt.updatedBy = user.id;

			// Update prompt
			await db.update('prompts', existingPrompt, ['name', 'prompt', 'updatedAt'], transaction);
		}

		// Get terms associated with existing prompt
		const existingTermsQuery = `
			SELECT prompt_id, term_id, created_at
			FROM prompt_terms
			WHERE prompt_id = $1
		`;
		const existingPromptTerms = await db.query<PromptTerm>(PromptTerm, existingTermsQuery, [promptId]);

		// Identify terms to be deleted
		const termsToDelete = existingPromptTerms.filter((term) => !termIds.includes(term.termId));
		if (termsToDelete.length) {
			await Promise.all(
				termsToDelete.map((term) => db.remove('prompt_terms', term, transaction)),
			);
		}

		// Identify terms to be added
		const termsToAdd = termIds.filter((termId) => !existingPromptTerms.find((term) => term.termId === termId));
		if (termsToAdd.length) {
			const newPromptTerms = termsToAdd.map((termId) => {
				const promptTerm = new PromptTerm();
				promptTerm.promptId = promptId;
				promptTerm.termId = termId;
				promptTerm.createdAt = new Date();
				return promptTerm;
			});
			await db.insertMultiple('prompt_terms', newPromptTerms, [], transaction);
		}
	});

	return c.body(null, StatusCodes.NO_CONTENT);
};

/**
 * Deletes a prompt and its associated term relationships from the database.
 *
 * This function validates the prompt's existence, removes all prompt-term associations,
 * and deletes the prompt itself within a transaction.
 *
 * @param c - The request context containing the prompt ID to delete.
 * @returns A 204 No Content response on success.
 * @throws {ApiError} If the prompt does not exist.
 */
export const deletePrompt = async (c: Context) => {
	const { promptId } = c.get('params') as DeletePromptParams;

	const db = Database.instance;

	// Delete the prompt
	await db.withTransaction(async (transaction) => {
		const existingPrompt = await db.queryOne<Prompt>(Prompt, `SELECT * FROM prompts WHERE id = $1`, [promptId]);
		if (!existingPrompt) {
			throwApiError(
				StatusCodes.NOT_FOUND,
				'Cannot delete prompt: Prompt not found',
			);
		}

		// Delete associated prompt terms
		await db.queryRaw(
			`DELETE FROM prompt_terms WHERE prompt_id = $1`,
			[promptId],
			transaction,
		);

		// Delete the prompt
		await db.queryRaw(
			`DELETE FROM prompts WHERE id = $1`,
			[promptId],
			transaction,
		);
	});

	return c.body(null, StatusCodes.NO_CONTENT);
};
