import Joi from 'npm:joi';

export type UserPromptReactionType = 'up' | 'down';

export type CreateUserPromptReactionParams = {
	promptId: string;
};
export type CreateUserPromptReactionBody = {
	reactionType: UserPromptReactionType;
};

export interface UserPromptReactionDeleteParams {
	promptId: string;
}

export const createUserPromptReactionSchema = Joi.object({
	params: Joi.object({
		promptId: Joi.string().required(),
	}).required(),
	body: Joi.object({
		reactionType: Joi.string().valid('up', 'down').required(),
	}).required(),
});

export const userPromptReactionDeleteSchema = Joi.object({
	params: Joi.object({
		promptId: Joi.string().required(),
	}).required(),
});
