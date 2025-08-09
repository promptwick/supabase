import Joi from 'npm:joi';

export interface UserPromptFavoritePostBody {
  promptId: string;
}

export interface UserPromptFavoriteDeleteParams {
  promptId: string;
}

export const userPromptFavoritePostSchema = Joi.object({
  body: Joi.object({
    promptId: Joi.string().required(),
  }).required(),
});

export const userPromptFavoriteDeleteSchema = Joi.object({
  params: Joi.object({
    promptId: Joi.string().required(),
  }).required(),
});
