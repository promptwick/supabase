import { Context } from 'jsr:@hono/hono';
import { StatusCodes } from 'npm:http-status-codes';
import { v7 as uuid } from 'npm:uuid';
import Database from '../models/database.ts';
import Taxonomy from '../models/taxonomys.ts';
import { TaxonomyGetParams, TaxonomyPatchBody, TaxonomyPostBody } from '../schemas/taxonomys.ts';
import { throwApiError } from '../utils/error.ts';

/**
 * Get a taxonomy by its ID.
 * @param {Context} c - Hono context object
 * @returns {Promise<Response>} JSON response with taxonomy or error
 */
const getTaxonomy = async (c: Context) => {
	const db = Database.instance;
	const { taxonomyId } = c.req.param() as unknown as TaxonomyGetParams;

	const taxonomy = await db.queryOne<Taxonomy>(
		`SELECT * FROM taxonomys WHERE id = $1`,
		[taxonomyId],
	);
	if (!taxonomy) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'The requested taxonomy could not be found',
		);
	}
	return c.json(taxonomy, StatusCodes.OK);
};

/**
 * Get all taxonomies.
 * @param {Context} c - Hono context object
 * @returns {Promise<Response>} JSON response with all taxonomies
 */
const getAllTaxonomies = async (c: Context) => {
	const db = Database.instance;

	const taxonomies = await db.query<Taxonomy>(`SELECT * FROM taxonomys`);
	return c.json(taxonomies, StatusCodes.OK);
};

/**
 * Create a new taxonomy.
 * @param {Context} c - Hono context object
 * @returns {Promise<Response>} JSON response with success status
 */
const createTaxonomy = async (c: Context) => {
	const db = Database.instance;
	const { name } = await c.req.json<TaxonomyPostBody>();

	const newTaxonomy = new Taxonomy();
	newTaxonomy.id = uuid();
	newTaxonomy.name = name;
	newTaxonomy.createdAt = new Date();
	newTaxonomy.updatedAt = new Date();

	await db.insert('taxonomys', newTaxonomy);
	return c.json({ success: true }, StatusCodes.CREATED);
};

/**
 * Update an existing taxonomy by its ID.
 * @param {Context} c - Hono context object
 * @returns {Promise<Response>} JSON response with success status or error
 */
const patchTaxonomy = async (c: Context) => {
	const db = Database.instance;
	const { taxonomyId } = c.req.param() as unknown as TaxonomyGetParams;
	const { name } = await c.req.json<TaxonomyPatchBody>();

	const existingTaxonomy = await db.queryOne<Taxonomy>(
		`SELECT * FROM taxonomys WHERE id = $1`,
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
	await db.update('taxonomys', existingTaxonomy, ['name', 'updatedAt']);

	return c.json({ success: true }, StatusCodes.OK);
};

/**
 * Delete a taxonomy by its ID.
 * @param {Context} c - Hono context object
 * @returns {Promise<Response>} JSON response with success status or error
 */
const deleteTaxonomy = async (c: Context) => {
	const db = Database.instance;
	const { taxonomyId } = c.req.param() as unknown as TaxonomyGetParams;

	const existingTaxonomy = await db.queryOne<Taxonomy>(
		`SELECT * FROM taxonomys WHERE id = $1`,
		[taxonomyId],
	);
	if (!existingTaxonomy) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'Cannot delete taxonomy: Taxonomy not found',
		);
	}

	await db.remove('taxonomys', existingTaxonomy);
	return c.json({ success: true }, StatusCodes.OK);
};

export { createTaxonomy, deleteTaxonomy, getAllTaxonomies, getTaxonomy, patchTaxonomy };
