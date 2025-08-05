import joi from "./joi.ts";

export interface PromptGetParams {
  promptId: string;
}

export interface PromptGetAllQuery {
  limit: number;
  offset: number;
  order: "asc" | "desc";
  sortBy: string;
}

export interface PromptPostBody {
  content: string;
  isPublic: boolean;
  name: string;
  parentPromptId: string | null;
  termIds: string[];
}

export interface PromptPatchBody {
  content: string;
  name: string;
  termIds: string[];
}

export interface PromptPatchParams {
  promptId: string;
}

export interface PromptDeleteParams {
  promptId: string;
}

export const promptGetSchema = joi.object({
  params: joi.object({
    promptId: joi.string().required(),
  }).required(),
}).unknown();

export const promptGetAllSchema = joi.object({
  query: joi.object({
    order: joi.string().valid("asc", "desc").required(),
    sortBy: joi.string().required(),
  }).required(),
}).unknown();

export const promptPostSchema = joi.object({
  body: joi.object({
    isPublic: joi.boolean().required(),
    name: joi.string().required(),
    content: joi.string().required(),
    termIds: joi.array().items(joi.string()).required(),
  }).required(),
});

export const promptPatchSchema = joi.object({
  body: joi.object({
    name: joi.string().required(),
    content: joi.string().required(),
    termIds: joi.array().items(joi.string()).required(),
  }).required(),
  params: joi.object({
    promptId: joi.string().required(),
  }).required(),
});

export const promptDeleteSchema = joi.object({
  params: joi.object({
    promptId: joi.string().required(),
  }).required(),
});
