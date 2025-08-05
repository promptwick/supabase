import joi from './joi.ts';

export interface PromptTermPostBody {
    promptId: string;
    termId: string;
}

export interface PromptTermPatchBody {
    promptId?: string;
    termId?: string;
}

export interface PromptTermPatchParams {
    id: string;
}

export interface PromptTermDeleteParams {
    id: string;
}

export const promptTermPostSchema = joi.object({
    body: joi.object({
        promptId: joi.string().required(),
        termId: joi.string().required(),
    }).required(),
});

export const promptTermPatchSchema = joi.object({
    body: joi.object({
        promptId: joi.string().optional(),
        termId: joi.string().optional(),
    }).required(),
    params: joi.object({
        id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    }).required(),
});

export const promptTermDeleteSchema = joi.object({
    params: joi.object({
        id: joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
    }).required(),
});