import Joi from 'npm:joi';

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

export const termGetSchema = Joi.object({
    params: Joi.object({
        termId: Joi.string().required(),
    }).required(),
});

export const termPostSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().required(),
        taxonomyId: Joi.string().required(),
    }).required(),
});

export const termPatchSchema = Joi.object({
    params: Joi.object({
        termId: Joi.string().required(),
    }).required(),
    body: Joi.object({
        name: Joi.string().optional(),
    }).required(),
});

export const termDeleteSchema = Joi.object({
    params: Joi.object({
        termId: Joi.string().required(),
    }).required(),
});
