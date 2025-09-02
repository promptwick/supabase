import { Context } from 'jsr:@hono/hono';

import { StatusCodes } from 'npm:http-status-codes';
import { v7 as uuid } from 'npm:uuid';

import Term from '../models/term.ts';
import Database from '../models/database.ts';
import { CreateTermBody, DeleteTermParams, GetAllTermsQuery, GetTermParams, UpdateTermBody, UpdateTermParams } from '../schemas/term.ts';
import { throwApiError } from '../utils/error.ts';
import { QueryArguments } from 'jsr:@db/postgres';

/**
 * Retrieves a term by its ID from the database and returns it as a JSON response.
 *
 * @param c - The request context containing parameters and utilities for handling the request.
 * @returns A JSON response containing the term data and a 200 OK status.
 * @throws {ApiError} If the term with the specified ID does not exist.
 */
export const getTerm = async (c: Context) => {
	const { termId } = c.get('params') as unknown as GetTermParams;

	const db = Database.instance;

	const term = await db.queryOne<Term>(
		Term,
		`
		SELECT
		  id,
		  name,
		  taxonomy_id,
		  locale_id,
		  created_at,
		  updated_at
		FROM terms
		WHERE id = $1
		  AND deleted_at IS NULL
		`,
		[termId],
	);
	if (!term) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'The requested term could not be found',
		);
	}

	return c.json({ data: term }, StatusCodes.OK);
};

/**
 * Retrieves all terms from the database.
 *
 * @param c - The request context.
 * @returns A JSON response containing an array of all terms and a 200 OK status.
 */
export const getAllTerms = async (c: Context) => {
	const { taxonomyId, localeId, parentTermId, includeChildren } = c.get('query') as GetAllTermsQuery;

	const db = Database.instance;

	let query = `
		SELECT
		  id,
		  name,
		  taxonomy_id,
		  locale_id,
		  parent_term_id,
		  created_at,
		  updated_at
		FROM terms
		WHERE deleted_at IS NULL
	`;
	const params: QueryArguments = {};

	if (taxonomyId) {
		query += ` AND taxonomy_id = $TAXONOMY_ID`;
		params.taxonomy_id = taxonomyId;
	}
	if (localeId) {
		query += ` AND locale_id = $LOCALE_ID`;
		params.locale_id = localeId;
	}
	if (parentTermId) {
		query += ` AND parent_term_id = $PARENT_TERM_ID`;
		params.parent_term_id = parentTermId;
	}
	if (!includeChildren) {
		query += ` AND parent_term_id IS NULL`;
	}

	const terms = await db.query<Term>(Term, query, params);

	let response = terms;
	if (includeChildren) {
		// Sort the responses such that the children are assigned inside the "children" attribute in parent
		const termsMap = new Map<string, Term>();
		terms.forEach((term) => termsMap.set(term.id, term));
		terms.forEach((term) => {
			if (term.parentTermId) {
				const parent = termsMap.get(term.parentTermId);
				if (parent) {
					if (!parent.children) {
						parent.children = [];
					}
					parent.children.push(termsMap.get(term.id)!);
				}
			}
		});
		response = Array.from(termsMap.values()).filter((term) => !term.parentTermId);
	}

	return c.json({ data: response }, StatusCodes.OK);
};

/**
 * Creates a new term in the database.
 *
 * @param c - The request context containing the term data in the request body.
 * @returns A JSON response containing the created term and a 201 Created status.
 */
export const createTerm = async (c: Context) => {
	const { name, taxonomyId } = c.get('body') as CreateTermBody;

	const db = Database.instance;

	const newTerm = new Term();
	newTerm.id = uuid();
	newTerm.name = name;
	newTerm.taxonomyId = taxonomyId;
	newTerm.createdAt = new Date();
	newTerm.updatedAt = new Date();

	await db.insert('terms', newTerm);

	return c.json(newTerm, StatusCodes.CREATED);
};

/**
 * Updates an existing term's name in the database.
 *
 * @param c - The request context containing the term ID and update data.
 * @returns A JSON response containing the updated term and a 200 OK status.
 * @throws {ApiError} If the term does not exist.
 */
export const patchTerm = async (c: Context) => {
	const { termId } = c.get('params') as unknown as UpdateTermParams;
	const { name } = c.get('body') as UpdateTermBody;

	const db = Database.instance;

	const existingTerm = await db.queryOne<Term>(
		Term,
		`
		SELECT
		  id,
		  name,
		  taxonomy_id,
		  locale_id,
		  created_at,
		  updated_at
		FROM terms
		WHERE id = $1
		  AND deleted_at IS NULL
		`,
		[termId],
	);
	if (!existingTerm) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'Cannot update term: Term not found',
		);
	}

	if (name) {
		existingTerm.name = name;
	}
	existingTerm.updatedAt = new Date();
	await db.update('terms', existingTerm, ['name', 'updatedAt']);

	return c.json(existingTerm, StatusCodes.OK);
};

/**
 * Deletes a term from the database.
 *
 * @param c - The request context containing the term ID to delete.
 * @returns A 204 No Content response on success.
 * @throws {ApiError} If the term does not exist.
 */
export const deleteTerm = async (c: Context) => {
	const { termId } = c.get('params') as unknown as DeleteTermParams;

	const db = Database.instance;

	const existingTerm = await db.queryOne<Term>(
		Term,
		`
		SELECT
		  id,
		  name,
		  taxonomy_id,
		  locale_id,
		  created_at,
		  updated_at
		FROM terms
		WHERE id = $1
		  AND deleted_at IS NULL
		`,
		[termId],
	);
	if (!existingTerm) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'Cannot delete term: Term not found',
		);
	}

	await db.remove('terms', existingTerm);

	return c.status(StatusCodes.NO_CONTENT);
};
