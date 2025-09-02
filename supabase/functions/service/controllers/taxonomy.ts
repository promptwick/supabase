import { Context } from 'jsr:@hono/hono';
import { StatusCodes } from 'npm:http-status-codes';
import { v7 as uuid } from 'npm:uuid';
import Database from '../models/database.ts';
import Taxonomy from '../models/taxonomy.ts';
import { CreateTaxonomyBody, GetTaxonomyParams, UpdateTaxonomyBody } from '../schemas/taxonomy.ts';
import { throwApiError } from '../utils/error.ts';

/**
 * Get a taxonomy by its ID.
 * @param {Context} c - Hono context object
 * @returns {Promise<Response>} JSON response with taxonomy or error
 */
export const getTaxonomy = async (c: Context): Promise<Response> => {
	const db = Database.instance;
	const { taxonomyId } = c.get('params') as GetTaxonomyParams;

	const taxonomy = await db.queryOne<Taxonomy>(
		Taxonomy,
		`
		SELECT
		  id,
		  name,
		  description,
		  multiple_terms,
		  locale_id,
		  created_at,
		  updated_at
		FROM taxonomies
		WHERE id = $1
		  AND deleted_at IS NULL
		`,
		[taxonomyId],
	);
	if (!taxonomy) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'The requested taxonomy could not be found',
		);
	}
	return c.json({ data: taxonomy }, StatusCodes.OK);
};

/**
 * Get all taxonomies.
 * @param {Context} c - Hono context object
 * @returns {Promise<Response>} JSON response with all taxonomies
 */
export const getAllTaxonomies = async (c: Context): Promise<Response> => {
	const db = Database.instance;

	const query = `
		SELECT
		  id,
		  name,
		  description,
		  multiple_terms,
		  locale_id,
		  created_at,
		  updated_at
		FROM taxonomies
		WHERE deleted_at IS NULL
	`;

	const taxonomies = await db.query<Taxonomy>(Taxonomy, query);
	return c.json({ data: taxonomies }, StatusCodes.OK);
};

/**
 * Create a new taxonomy.
 * @param {Context} c - Hono context object
 * @returns {Promise<Response>} JSON response with success status
 */
export const createTaxonomy = async (c: Context): Promise<Response> => {
	const db = Database.instance;
	const { name } = c.get('body') as CreateTaxonomyBody;

	const newTaxonomy = new Taxonomy();
	newTaxonomy.id = uuid();
	newTaxonomy.name = name;
	newTaxonomy.createdAt = new Date();
	newTaxonomy.updatedAt = new Date();

	await db.insert('taxonomies', newTaxonomy);
	return c.json({ success: true }, StatusCodes.CREATED);
};

/**
 * Update an existing taxonomy by its ID.
 * @param {Context} c - Hono context object
 * @returns {Promise<Response>} JSON response with success status or error
 */
export const patchTaxonomy = async (c: Context): Promise<Response> => {
	const db = Database.instance;
	const { taxonomyId } = c.get('params') as GetTaxonomyParams;
	const { name } = c.get('body') as UpdateTaxonomyBody;

	const existingTaxonomy = await db.queryOne<Taxonomy>(
		Taxonomy,
		`
		SELECT
		  id,
		  name,
		  description,
		  multiple_terms,
		  locale_id,
		  created_at,
		  updated_at
		FROM taxonomies
		WHERE id = $1
		  AND deleted_at IS NULL
		`,
		[taxonomyId],
	);
	if (!existingTaxonomy) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'Cannot update taxonomy: Taxonomy not found',
		);
	}

	existingTaxonomy.name = name;
	existingTaxonomy.updatedAt = new Date();
	await db.update('taxonomies', existingTaxonomy, ['name', 'updatedAt']);

	return c.json({ success: true }, StatusCodes.OK);
};

/**
 * Delete a taxonomy by its ID.
 * @param {Context} c - Hono context object
 * @returns {Promise<Response>} JSON response with success status or error
 */

export const deleteTaxonomy = async (c: Context): Promise<Response> => {
	const db = Database.instance;
	const { taxonomyId } = c.get('params') as GetTaxonomyParams;

	const existingTaxonomy = await db.queryOne<Taxonomy>(
		Taxonomy,
		`
		SELECT
		  id,
		  name,
		  description,
		  multiple_terms,
		  locale_id,
		  created_at,
		  updated_at
		FROM taxonomies
		WHERE id = $1
		  AND deleted_at IS NULL
		`,
		[taxonomyId],
	);
	if (!existingTaxonomy) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'Cannot delete taxonomy: Taxonomy not found',
		);
	}

	await db.remove('taxonomies', existingTaxonomy);
	return c.json({ success: true }, StatusCodes.OK);
};
