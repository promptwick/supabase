import Joi from 'npm:joi';

export type GetTaxonomyParams = {
	taxonomyId: string;
};

export type CreateTaxonomyBody = {
	name: string;
};

export type EditTaxonomyBody = {
	name: string;
};

export type EditTaxonomyParams = {
	taxonomyId: string;
};

export type DeleteTaxonomyParams = {
	taxonomyId: string;
};

export const getTaxonomySchema = Joi.object({
	params: Joi.object({
		taxonomyId: Joi.string().pattern(/^[0-9]+$/).required(),
	}).required(),
});

export const createTaxonomySchema = Joi.object({
	body: Joi.object({
		name: Joi.string().required(),
	}).required(),
});

export const editTaxonomySchema = Joi.object({
	body: Joi.object({
		name: Joi.string().required(),
	}).required(),
	params: Joi.object({
		taxonomyId: Joi.string().pattern(/^[0-9]+$/).required(),
	}).required(),
});

export const deleteTaxonomySchema = Joi.object({
	params: Joi.object({
		taxonomyId: Joi.string().pattern(/^[0-9]+$/).required(),
	}).required(),
});
