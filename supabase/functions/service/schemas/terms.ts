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
