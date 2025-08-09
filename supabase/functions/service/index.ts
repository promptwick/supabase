import { Hono } from 'jsr:@hono/hono';

import { createTaxonomy, deleteTaxonomy, getAllTaxonomies, getTaxonomy, patchTaxonomy } from './controllers/taxonomy.ts';
import { createTerm, deleteTerm, getAllTerms, getTerm, patchTerm } from './controllers/terms.ts';
import { createPrompt, deletePrompt, getAllPrompts, getPrompt, patchPrompt } from './controllers/prompts.ts';
import { createUserPromptFavorite, deleteUserPromptFavorite } from './controllers/user_prompt_favorites.ts';
import { createUserPromptReaction, deleteUserPromptReaction } from './controllers/user_prompt_reactions.ts';
import { withAuthorization } from './middlewares/authorizer.ts';
import { errorHandler } from './middlewares/error-handler.ts';
import { withSupabase } from './middlewares/supabase.ts';
import { withValidation } from './middlewares/validator.ts';
import { promptDeleteSchema, promptGetAllSchema, promptGetSchema, promptPatchSchema, promptPostSchema } from './schemas/prompts.ts';
import { userPromptFavoritePostSchema, userPromptFavoriteDeleteSchema } from './schemas/user_prompt_favorites.ts';
import { userPromptReactionDeleteSchema, userPromptReactionPostSchema } from './schemas/user_prompt_reactions.ts';

const app = new Hono();

// Apply error handler middleware first to catch all errors
app.use('*', errorHandler);

// Apply Supabase middleware to all routes
app.use('*', withSupabase);

// Apply authorization middleware to all routes
app.use('*', withAuthorization);

/* ------------------------------- Taxonomies ------------------------------- */
app.get('/taxonomies', withValidation(taxonomyGetAllSchema), getAllTaxonomies);
app.get('/taxonomies/:taxonomyId', withValidation(taxonomyGetSchema), getTaxonomy);
app.post('/taxonomies', withValidation(taxonomyPostSchema), createTaxonomy);
app.patch('/taxonomies/:taxonomyId', withValidation(taxonomyPatchSchema), patchTaxonomy);
app.delete('/taxonomies/:taxonomyId', withValidation(taxonomyDeleteSchema), deleteTaxonomy);

/* ---------------------------------- Terms --------------------------------- */
app.get('/terms', withValidation(termGetAllSchema), getAllTerms);
app.get('/terms/:termId', withValidation(termGetSchema), getTerm);
app.post('/terms', withValidation(termPostSchema), createTerm);
app.patch('/terms/:termId', withValidation(termPatchSchema), patchTerm);
app.delete('/terms/:termId', withValidation(termDeleteSchema), deleteTerm);

/* --------------------------------- Prompts -------------------------------- */
app.get('/prompts', withValidation(promptGetAllSchema), getAllPrompts);
app.get('/prompts/:promptId', withValidation(promptGetSchema), getPrompt);
app.post('/prompts', withValidation(promptPostSchema), createPrompt);
app.patch('/prompts/:promptId', withValidation(promptPatchSchema), patchPrompt);
app.delete('/prompts/:promptId', withValidation(promptDeleteSchema), deletePrompt);

/* -------------------------- User Prompt Favorites -------------------------- */
app.post('/prompts/:promptId/favorites', withValidation(userPromptFavoritePostSchema), createUserPromptFavorite);
app.delete('/prompts/:promptId/favorites', withValidation(userPromptFavoriteDeleteSchema), deleteUserPromptFavorite);

/* -------------------------- User Prompt Reactions -------------------------- */
app.post('/prompts/:promptId/reactions', withValidation(userPromptReactionPostSchema), createUserPromptReaction);
app.delete('/prompts/:promptId/reactions', withValidation(userPromptReactionDeleteSchema), deleteUserPromptReaction);

Deno.serve(app.fetch);
