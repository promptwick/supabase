import Joi from 'npm:joi';

export type UserPromptReactionType = 'up' | 'down';

export type UserPromptReactionPostBody = {
  userId: string;
  promptId: string;
  reactionType: UserPromptReactionType;
};


export interface UserPromptReactionDeleteParams {
  promptId: string;
}

export const userPromptReactionPostSchema = Joi.object({
  body: Joi.object({
    userId: Joi.string().uuid().required(),
    promptId: Joi.string().uuid().required(),
    reactionType: Joi.string().valid('up', 'down').required(),
  }).required(),
});

export const userPromptReactionDeleteSchema = Joi.object({
  params: Joi.object({
    promptId: Joi.string().required(),
  }).required(),
});
