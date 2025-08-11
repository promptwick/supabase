import Joi from 'npm:joi';

export interface PromptTermPostBody {
	promptId: string;
	termId: string;
}

export interface PromptTermDeleteParams {
	id: string;
}

export const promptTermPostSchema = Joi.object({
	body: Joi.object({
		promptId: Joi.string().required(),
		termId: Joi.string().required(),
	}).required(),
});

export const promptTermDeleteSchema = Joi.object({
	params: Joi.object({
		id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
	}).required(),
});
