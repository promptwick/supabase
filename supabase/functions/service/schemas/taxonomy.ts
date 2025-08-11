import Joi from 'npm:joi';

export type TaxonomyGetParams = {
	taxonomyId: string;
};

export type TaxonomyPostBody = {
	name: string;
};

export type TaxonomyPatchBody = {
	name: string;
};

export type TaxonomyPatchParams = {
	taxonomyId: string;
};

export type TaxonomyDeleteParams = {
	taxonomyId: string;
};

export const taxonomyGetSchema = Joi.object({
	params: Joi.object({
		taxonomyId: Joi.string().pattern(/^[0-9]+$/).required(),
	}).required(),
});

export const taxonomyPostSchema = Joi.object({
	body: Joi.object({
		name: Joi.string().required(),
	}).required(),
});

export const taxonomyPatchSchema = Joi.object({
	body: Joi.object({
		name: Joi.string().required(),
	}).required(),
	params: Joi.object({
		taxonomyId: Joi.string().pattern(/^[0-9]+$/).required(),
	}).required(),
});

export const taxonomyDeleteSchema = Joi.object({
	params: Joi.object({
		taxonomyId: Joi.string().pattern(/^[0-9]+$/).required(),
	}).required(),
});
