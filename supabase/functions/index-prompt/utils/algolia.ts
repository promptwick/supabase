import { searchClient } from "npm:@algolia/client-search";

/**
 * Returns an Algolia search client using credentials from environment variables.
 * @throws {Error} If ALGOLIA_APP_ID or ALGOLIA_API_KEY is not set in the environment.
 * @returns {ReturnType<typeof searchClient>} The Algolia search client instance
 */
export const getAlgoliaClient = () => {
  const appId = Deno.env.get("ALGOLIA_APP_ID");
  const apiKey = Deno.env.get("ALGOLIA_API_KEY");

  if (!appId || !apiKey) {
    throw new Error("Algolia credentials are not set");
  }

  return searchClient(appId, apiKey);
};