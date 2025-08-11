import { Hono } from 'jsr:@hono/hono';

import { createTaxonomy, deleteTaxonomy, getAllTaxonomies, getTaxonomy, patchTaxonomy } from './controllers/taxonomy.ts';
import { createTerm, deleteTerm, getAllTerms, getTerm, patchTerm } from './controllers/term.ts';
import { createPrompt, deletePrompt, getAllPrompts, getPrompt, patchPrompt } from './controllers/prompt.ts';
import { createUserPromptFavorite, deleteUserPromptFavorite } from './controllers/user_prompt_favorite.ts';
import { createUserPromptReaction, deleteUserPromptReaction } from './controllers/user_prompt_reaction.ts';
import { withAuthorization } from './middlewares/authorizer.ts';
import { errorHandler } from './middlewares/error-handler.ts';
import { withSupabase } from './middlewares/supabase.ts';
import { withValidation } from './middlewares/validator.ts';
import { promptDeleteSchema, promptGetAllSchema, promptGetSchema, promptPatchSchema, promptPostSchema } from './schemas/prompt.ts';
import { taxonomyDeleteSchema, taxonomyGetSchema, taxonomyPatchSchema, taxonomyPostSchema } from './schemas/taxonomy.ts';
import { termDeleteSchema, termGetAllSchema, termGetSchema, termPatchSchema, termPostSchema } from './schemas/term.ts';
import { userPromptFavoritePostSchema, userPromptFavoriteDeleteSchema } from './schemas/user_prompt_favorite.ts';
import { userPromptReactionDeleteSchema, userPromptReactionPostSchema } from './schemas/user_prompt_reaction.ts';

const BASE_PATH = '/service';

const app = new Hono();

// Apply error handler middleware first to catch all errors
app.use('*', errorHandler);

// Apply Supabase middleware to all routes
app.use('*', withSupabase);

// Apply authorization middleware to all routes
app.use('*', withAuthorization);

/* ------------------------------- Taxonomies ------------------------------- */
app.get(`${BASE_PATH}/taxonomies`, getAllTaxonomies);
app.get(`${BASE_PATH}/taxonomies/:taxonomyId`, withValidation(taxonomyGetSchema), getTaxonomy);
app.post(`${BASE_PATH}/taxonomies`, withValidation(taxonomyPostSchema), createTaxonomy);
app.patch(`${BASE_PATH}/taxonomies/:taxonomyId`, withValidation(taxonomyPatchSchema), patchTaxonomy);
app.delete(`${BASE_PATH}/taxonomies/:taxonomyId`, withValidation(taxonomyDeleteSchema), deleteTaxonomy);

/* ---------------------------------- Terms --------------------------------- */
app.get(`${BASE_PATH}/terms`, withValidation(termGetAllSchema), getAllTerms);
app.get(`${BASE_PATH}/terms/:termId`, withValidation(termGetSchema), getTerm);
app.post(`${BASE_PATH}/terms`, withValidation(termPostSchema), createTerm);
app.patch(`${BASE_PATH}/terms/:termId`, withValidation(termPatchSchema), patchTerm);
app.delete(`${BASE_PATH}/terms/:termId`, withValidation(termDeleteSchema), deleteTerm);

/* --------------------------------- Prompts -------------------------------- */
app.get(`${BASE_PATH}/prompts`, withValidation(promptGetAllSchema), getAllPrompts);
app.get(`${BASE_PATH}/prompts/:promptId`, withValidation(promptGetSchema), getPrompt);
app.post(`${BASE_PATH}/prompts`, withValidation(promptPostSchema), createPrompt);
app.patch(`${BASE_PATH}/prompts/:promptId`, withValidation(promptPatchSchema), patchPrompt);
app.delete(`${BASE_PATH}/prompts/:promptId`, withValidation(promptDeleteSchema), deletePrompt);

/* -------------------------- User Prompt Favorites -------------------------- */
app.post(`${BASE_PATH}/prompts/:promptId/favorites`, withValidation(userPromptFavoritePostSchema), createUserPromptFavorite);
app.delete(`${BASE_PATH}/prompts/:promptId/favorites`, withValidation(userPromptFavoriteDeleteSchema), deleteUserPromptFavorite);

/* -------------------------- User Prompt Reactions -------------------------- */
app.post(`${BASE_PATH}/prompts/:promptId/reactions`, withValidation(userPromptReactionPostSchema), createUserPromptReaction);
app.delete(`${BASE_PATH}/prompts/:promptId/reactions`, withValidation(userPromptReactionDeleteSchema), deleteUserPromptReaction);

Deno.serve(app.fetch);
