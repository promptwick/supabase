import joi from "./joi.ts";

export interface TaxonomyGetParams {
    taxonomyId: string;
}

export interface TaxonomyPostBody {
    name: string;
}

export interface TaxonomyPatchBody {
    name: string;
}

export interface TaxonomyPatchParams {
    taxonomyId: string;
}

export interface TaxonomyDeleteParams {
    taxonomyId: string;
}

export const taxonomyGetSchema = joi.object({
    params: joi.object({
        taxonomyId: joi.string().pattern(/^[0-9]+$/).required(),
    }).required(),
});

export const taxonomyPostSchema = joi.object({
    body: joi.object({
        name: joi.string().required(),
    }).required(),
});

export const taxonomyPatchSchema = joi.object({
    body: joi.object({
        name: joi.string().required(),
    }).required(),
    params: joi.object({
        taxonomyId: joi.string().pattern(/^[0-9]+$/).required(),
    }).required(),
});

export const taxonomyDeleteSchema = joi.object({
    params: joi.object({
        taxonomyId: joi.string().pattern(/^[0-9]+$/).required(),
    }).required(),
});
