import Joi from 'npm:joi';

export interface GetTermParams {
	termId: string;
}

export interface GetAllTermsQuery {
	parentTermId?: string;
	includeChildren?: boolean;
	taxonomyId?: string;
	localeId?: string;
}

export interface CreateTermBody {
	name: string;
	taxonomyId: string;
}

export interface UpdateTermBody {
	name?: string;
}

export interface UpdateTermParams {
	termId: string;
}

export interface DeleteTermParams {
	termId: string;
}

export const getTermSchema = Joi.object({
	params: Joi.object({
		termId: Joi.string().required(),
	}).required(),
});

export const getAllTermsSchema = Joi.object({
	query: Joi.object({
		taxonomyId: Joi.string().optional(),
		localeId: Joi.string().optional(),
		parentTermId: Joi.string().optional(),
		includeChildren: Joi.boolean().optional(),
	}).required(),
});

export const createTermSchema = Joi.object({
	body: Joi.object({
		name: Joi.string().required(),
		taxonomyId: Joi.string().required(),
	}).required(),
});

export const updateTermSchema = Joi.object({
	params: Joi.object({
		termId: Joi.string().required(),
	}).required(),
	body: Joi.object({
		name: Joi.string().optional(),
	}).required(),
});

export const deleteTermSchema = Joi.object({
	params: Joi.object({
		termId: Joi.string().required(),
	}).required(),
});
