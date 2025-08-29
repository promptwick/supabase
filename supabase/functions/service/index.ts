import { Hono } from 'jsr:@hono/hono';
import { cors } from 'jsr:@hono/hono/cors';

import { createTaxonomy, deleteTaxonomy, getAllTaxonomies, getTaxonomy, patchTaxonomy } from './controllers/taxonomy.ts';
import { createTerm, deleteTerm, getAllTerms, getTerm, patchTerm } from './controllers/term.ts';
import { createPrompt, deletePrompt, getAllPrompts, getPrompt, patchPrompt } from './controllers/prompt.ts';
import { createUserPromptFavorite, deleteUserPromptFavorite } from './controllers/user_prompt_favorite.ts';
import { createUserPromptReaction, deleteUserPromptReaction } from './controllers/user_prompt_reaction.ts';
import { withAuthorization } from './middlewares/authorizer.ts';
import { errorHandler } from './middlewares/error-handler.ts';
import { withSupabase } from './middlewares/supabase.ts';
import { withValidation } from './middlewares/validator.ts';
import { promptDeleteSchema, promptGetAllSchema, promptGetSchema, promptPatchSchema, createPromptSchema } from './schemas/prompt.ts';
import { taxonomyDeleteSchema, taxonomyGetSchema, taxonomyPatchSchema, createTaxonomySchema } from './schemas/taxonomy.ts';
import { termDeleteSchema, termGetAllSchema, termGetSchema, termPatchSchema, createTermSchema } from './schemas/term.ts';
import { userPromptFavoriteDeleteSchema, createUserPromptFavoriteSchema } from './schemas/user_prompt_favorite.ts';
import { userPromptReactionDeleteSchema, createUserPromptReactionSchema } from './schemas/user_prompt_reaction.ts';

const BASE_PATH = '/service';

const app = new Hono();

app.use(
	'*',
	cors({
		origin: '*',
		allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization'],
	}),
);

app.options('*', (c) => c.text('OK', 200));

// Apply error handler middleware first to catch all errors
app.onError(errorHandler);

// Apply Supabase middleware to all routes
app.use('*', withSupabase);

// Apply authorization middleware to all routes
app.use('*', withAuthorization);

/* ------------------------------- Taxonomies ------------------------------- */
app.get(`${BASE_PATH}/taxonomies`, getAllTaxonomies);
app.get(`${BASE_PATH}/taxonomies/:taxonomyId`, withValidation(taxonomyGetSchema), getTaxonomy);
app.post(`${BASE_PATH}/taxonomies`, withValidation(createTaxonomySchema), createTaxonomy);
app.patch(`${BASE_PATH}/taxonomies/:taxonomyId`, withValidation(taxonomyPatchSchema), patchTaxonomy);
app.delete(`${BASE_PATH}/taxonomies/:taxonomyId`, withValidation(taxonomyDeleteSchema), deleteTaxonomy);

/* ---------------------------------- Terms --------------------------------- */
app.get(`${BASE_PATH}/terms`, withValidation(termGetAllSchema), getAllTerms);
app.get(`${BASE_PATH}/terms/:termId`, withValidation(termGetSchema), getTerm);
app.post(`${BASE_PATH}/terms`, withValidation(createTermSchema), createTerm);
app.patch(`${BASE_PATH}/terms/:termId`, withValidation(termPatchSchema), patchTerm);
app.delete(`${BASE_PATH}/terms/:termId`, withValidation(termDeleteSchema), deleteTerm);

/* --------------------------------- Prompts -------------------------------- */
app.get(`${BASE_PATH}/prompts`, withValidation(promptGetAllSchema), getAllPrompts);
app.get(`${BASE_PATH}/prompts/:promptId`, withValidation(promptGetSchema), getPrompt);
app.post(`${BASE_PATH}/prompts`, withValidation(createPromptSchema), createPrompt);
app.patch(`${BASE_PATH}/prompts/:promptId`, withValidation(promptPatchSchema), patchPrompt);
app.delete(`${BASE_PATH}/prompts/:promptId`, withValidation(promptDeleteSchema), deletePrompt);

/* -------------------------- User Prompt Favorites -------------------------- */
app.post(`${BASE_PATH}/prompts/:promptId/favorites`, withValidation(createUserPromptFavoriteSchema), createUserPromptFavorite);
app.delete(`${BASE_PATH}/prompts/:promptId/favorites`, withValidation(userPromptFavoriteDeleteSchema), deleteUserPromptFavorite);

/* -------------------------- User Prompt Reactions -------------------------- */
app.post(`${BASE_PATH}/prompts/:promptId/reactions`, withValidation(createUserPromptReactionSchema), createUserPromptReaction);
app.delete(`${BASE_PATH}/prompts/:promptId/reactions`, withValidation(userPromptReactionDeleteSchema), deleteUserPromptReaction);

Deno.serve(app.fetch);
