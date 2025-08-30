import Joi from 'npm:joi';

export interface CreatePromptTermBody {
	promptId: string;
	termId: string;
}

export interface DeletePromptTermParams {
	id: string;
}

export const createPromptTermSchema = Joi.object({
	body: Joi.object({
		promptId: Joi.string().required(),
		termId: Joi.string().required(),
	}).required(),
});

export const deletePromptTermSchema = Joi.object({
	params: Joi.object({
		id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
	}).required(),
});
