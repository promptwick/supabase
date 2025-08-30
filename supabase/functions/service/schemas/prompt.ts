import Joi from 'npm:joi';

export type GetPromptParams = {
	promptId: string;
};

export type GetAllPromptsQuery = {
	isFavorited?: boolean;
	isPublic?: boolean;
	limit: number;
	offset: number;
	order: 'asc' | 'desc';
	searchQuery?: string;
	sortBy: string;
	termIds?: string[];
};

export type CreatePromptBody = {
	isPublic: boolean;
	localeId: string;
	name: string;
	parentPromptId?: string;
	prompt: string;
	termIds: string[];
};

export type UpdatePromptBody = {
	name: string;
	prompt: string;
	termIds: string[];
};

export type UpdatePromptParams = {
	promptId: string;
};

export type DeletePromptParams = {
	promptId: string;
};

export const getPromptSchema = Joi.object({
	params: Joi.object({
		promptId: Joi.string().required(),
	}).required(),
});

export const getAllPromptsSchema = Joi.object({
	query: Joi.object({
		isFavorited: Joi.boolean().optional(),
		isPublic: Joi.boolean().optional(),
		limit: Joi.number().integer().required(),
		offset: Joi.number().integer().required(),
		order: Joi.string().valid('asc', 'desc').optional(),
		searchQuery: Joi.string().optional(),
		sortBy: Joi.string().optional(),
		termIds: Joi.array().items(Joi.string()).optional(),
	}).required(),
});

export const createPromptSchema = Joi.object({
	body: Joi.object({
		isPublic: Joi.boolean().required(),
		name: Joi.string().required(),
		prompt: Joi.string().required(),
		parentPromptId: Joi.string().optional(),
		localeId: Joi.string().required(),
		termIds: Joi.array().items(Joi.string()).required(),
	}).required(),
});

export const updatePromptSchema = Joi.object({
	body: Joi.object({
		name: Joi.string().optional(),
		prompt: Joi.string().optional(),
		termIds: Joi.array().items(Joi.string()).optional(),
	}).required(),
	params: Joi.object({
		promptId: Joi.string().required(),
	}).required(),
});

export const deletePromptSchema = Joi.object({
	params: Joi.object({
		promptId: Joi.string().required(),
	}).required(),
});
