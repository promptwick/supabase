import Joi from 'npm:joi';

export type PromptGetParams = {
  promptId: string;
}

export type PromptGetAllQuery = {
  isFavorited?: boolean;
  isPublic?: boolean;
  limit: number;
  offset: number;
  order: "asc" | "desc";
  searchQuery?: string;
  sortBy: string;
  termIds?: string[];
}

export type PromptPostBody = {
  isPublic: boolean;
  localeId: string;
  name: string;
  parentPromptId?: string;
  prompt: string;
  termIds: string[];
}

export type PromptPatchBody = {
  name: string;
  prompt: string;
  termIds: string[];
}

export type PromptPatchParams = {
  promptId: string;
}

export type PromptDeleteParams = {
  promptId: string;
}

export const promptGetSchema = Joi.object({
  params: Joi.object({
    promptId: Joi.string().required(),
  }).required(),
});

export const promptGetAllSchema = Joi.object({
  query: Joi.object({
    isFavorited: Joi.boolean().optional(),
    isPublic: Joi.boolean().optional(),
    limit: Joi.number().integer().required(),
    offset: Joi.number().integer().required(),
    order: Joi.string().valid("asc", "desc").required(),
    searchQuery: Joi.string().optional(),
    sortBy: Joi.string().required(),
    termIds: Joi.array().items(Joi.string()).optional(),
  }).required(),
});

export const promptPostSchema = Joi.object({
  body: Joi.object({
    isPublic: Joi.boolean().required(),
    name: Joi.string().required(),
    prompt: Joi.string().required(),
    parentPromptId: Joi.string().optional(),
    localeId: Joi.string().required(),
    termIds: Joi.array().items(Joi.string()).required(),
  }).required(),
});

export const promptPatchSchema = Joi.object({
  body: Joi.object({
    name: Joi.string().optional(),
    prompt: Joi.string().optional(),
    termIds: Joi.array().items(Joi.string()).optional(),
  }).required(),
  params: Joi.object({
    promptId: Joi.string().required(),
  }).required(),
});

export const promptDeleteSchema = Joi.object({
  params: Joi.object({
    promptId: Joi.string().required(),
  }).required(),
});
