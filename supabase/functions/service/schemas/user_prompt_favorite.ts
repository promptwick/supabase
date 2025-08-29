import Joi from 'npm:joi';

export interface CreateUserPromptFavoriteBody {
  promptId: string;
}

export interface UserPromptFavoriteDeleteParams {
  promptId: string;
}

export const createUserPromptFavoriteSchema = Joi.object({
  params: Joi.object({
    promptId: Joi.string().required(),
  }).required(),
});

export const userPromptFavoriteDeleteSchema = Joi.object({
  params: Joi.object({
    promptId: Joi.string().required(),
  }).required(),
});
