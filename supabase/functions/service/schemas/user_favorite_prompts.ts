import joi from "./joi.ts";

export interface UserFavoritePromptPostBody {
  promptId: string;
}

export interface UserFavoritePromptDeleteParams {
  promptId: string;
}

export const userFavoritePromptPostSchema = joi.object({
  body: joi.object({
    promptId: joi.string().required(),
  }).required(),
});

export const userFavoritePromptDeleteSchema = joi.object({
  params: joi.object({
    promptId: joi.string().required(),
  }).required(),
});
