import { Hono } from "jsr:@hono/hono";

import {
  createTaxonomy,
  deleteTaxonomy,
  getAllTaxonomies,
  getTaxonomy,
  patchTaxonomy,
} from "./controllers/taxonomy.ts";
import {
  createTerm,
  deleteTerm,
  getAllTerms,
  getTerm,
  patchTerm,
} from "./controllers/terms.ts";
import {
  createPrompt,
  deletePrompt,
  getAllPrompts,
  getPrompt,
  patchPrompt,
} from "./controllers/prompts.ts";
import {
  createUserFavoritePrompt,
  deleteUserFavoritePrompt,
} from "./controllers/user_favorite_prompts.ts";
import { withSupabase } from "./middlewares/supabase.ts";
import { withAuthorization } from "./middlewares/authorizer.ts";
import { errorHandler } from "./middlewares/error-handler.ts";

const app = new Hono();

// Apply error handler middleware first to catch all errors
app.use("*", errorHandler);

// Apply Supabase middleware to all routes
app.use("*", withSupabase);

// Apply authorization middleware to all routes
app.use("*", withAuthorization);

/* ------------------------------- Taxonomies ------------------------------- */
app.get("/taxonomies", getAllTaxonomies);
app.get("/taxonomies/:taxonomyId", getTaxonomy);
app.post("/taxonomies", createTaxonomy);
app.patch("/taxonomies/:taxonomyId", patchTaxonomy);
app.delete("/taxonomies/:taxonomyId", deleteTaxonomy);

/* ---------------------------------- Terms ---------------------------------- */
app.get("/terms", getAllTerms);
app.get("/terms/:termId", getTerm);
app.post("/terms", createTerm);
app.patch("/terms/:termId", patchTerm);
app.delete("/terms/:termId", deleteTerm);

/* -------------------------------- Prompts -------------------------------- */
app.get("/prompts", getAllPrompts);
app.get("/prompts/:promptId", getPrompt);
app.post("/prompts", createPrompt);
app.patch("/prompts/:promptId", patchPrompt);
app.delete("/prompts/:promptId", deletePrompt);

/* ---------------------------- Prompt Reactions ---------------------------- */

/* -------------------------- User Favorite Prompts -------------------------- */
app.post("/user_favorite_prompts", createUserFavoritePrompt);
app.delete("/user_favorite_prompts/:promptId", deleteUserFavoritePrompt);

Deno.serve(app.fetch);
