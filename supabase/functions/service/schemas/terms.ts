import joi from './joi.ts';

export interface TermGetParams {
    termId: string;
}

export interface TermPostBody {
    name: string;
    taxonomyId: string;
}

export interface TermPatchBody {
    name?: string;
}

export interface TermPatchParams {
    termId: string;
}

export interface TermDeleteParams {
    termId: string;
}

export const termGetSchema = joi.object({
    params: joi.object({
        termId: joi.string().required(),
    }).required(),
}).unknown();

export const termPostSchema = joi.object({
    body: joi.object({
        name: joi.string().required(),
        taxonomyId: joi.string().required(),
    }).required(),
});

export const termPatchSchema = joi.object({
    body: joi.object({
        name: joi.string().optional(),
    }).required(),
    params: joi.object({
        termId: joi.string().required(),
    }).required(),
});

export const termDeleteSchema = joi.object({
    params: joi.object({
        termId: joi.string().required(),
    }).required(),
});