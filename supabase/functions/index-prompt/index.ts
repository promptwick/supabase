import { Client } from "jsr:@db/postgres";
import { StatusCodes } from "npm:http-status-codes";

import {
  Prompt,
  PromptRecord,
  PromptTermRecord,
  PromptWebhookPayload,
} from "./types.ts";
import { getDatabaseClient } from "./utils/database.ts";
import { generateResponse } from "./utils/helpers.ts";
import logger from "./utils/logger.ts";
import { getAlgoliaClient } from "./utils/algolia.ts";

const log = logger.child("index");

/**
 * Determines if the webhook payload should trigger an Algolia index update.
 * @param payload - The webhook payload from Supabase
 * @returns True if the prompt should be (re-)indexed, false otherwise
 */
const shouldIndex = (payload: PromptWebhookPayload) => {
  if (payload.table === "prompt_terms" || payload.type === "DELETE") {
    return true;
  }

  if (payload.type === "UPDATE" && payload.old_record) {
    const newRecord = payload.record as PromptRecord;
    const oldRecord = payload.old_record! as PromptRecord;

    return oldRecord.name !== newRecord.name ||
      oldRecord.prompt !== newRecord.prompt ||
      oldRecord.is_public !== newRecord.is_public ||
      oldRecord.is_latest_version !== newRecord.is_latest_version;
  }

  return true;
};

/**
 * Fetches the prompt and its related terms and taxonomy from the database.
 * @param db - The database client
 * @param promptId - The ID of the prompt to fetch
 * @returns The prompt record with terms and taxonomy info, or undefined if not found
 */
const getPrompt = async (db: Client, promptId: string) => {
  // Query the prompt info

  const query = `
      SELECT 
        p.id, 
        p.name, 
        p.prompt, 
        p.is_public, 
        p.is_latest_version,
        p.created_by,
        p.updated_by,
        p.created_at, 
        p.updated_at,
        JSON_AGG(JSON_BUILD_OBJECT(
          'id', terms.id,
          'name', terms.name,
          'taxonomy_id', terms.taxonomy_id,
          'taxonomy_name', taxonomies.name
        )) AS terms
      FROM prompts AS p
      LEFT JOIN prompt_terms AS pterms ON p.id = pterms.prompt_id
      LEFT JOIN terms AS terms ON pterms.term_id = terms.id
      LEFT JOIN taxonomies AS taxonomies ON terms.taxonomy_id = taxonomies.id
      WHERE p.id = $prompt_id
        AND p.deleted_at IS NULL
      GROUP BY p.id
    `;

  const result = await db.queryObject<Prompt>(query, {
    prompt_id: promptId,
  });

  return result.rows[0];
};

/**
 * Main webhook handler for Supabase database changes.
 * Accepts POST requests with webhook payloads and updates Algolia accordingly.
 * @param req - The incoming HTTP request
 * @returns A Response object with the result of the operation
 */
Deno.serve(async (req: Request) => {
  // Don't allow anything apart from POST
  if (req.method !== "POST") {
    return generateResponse(StatusCodes.METHOD_NOT_ALLOWED, {
      error: "Method not allowed",
    });
  }

  let db;

  try {
    const payload: PromptWebhookPayload = await req.json();

    log.info("Received webhook payload:", { payload });

    // Verify this is for the prompts table
    if (payload.table !== "prompts" && payload.table !== "prompt_terms") {
      log.info(`Ignoring webhook for table: ${payload.table}`);

      return generateResponse(StatusCodes.OK, {
        message: "Webhook ignored - not for prompts or prompt_terms table",
      });
    }

    if (!shouldIndex(payload)) {
      return generateResponse(StatusCodes.OK, {
        message: "Webhook ignore - relevant columns were not updated",
      });
    }

    // Grab the latest status of prompt
    db = await getDatabaseClient();
    const promptId = payload.table === "prompts"
      ? (payload.record as PromptRecord).id
      : (payload.record as PromptTermRecord).prompt_id;

    const promptBody = await getPrompt(db, promptId);

    if (!promptBody) {
      return generateResponse(StatusCodes.NOT_FOUND, {
        error: "Prompt not found",
      });
    }

    // Update in Algolia
    let response;
    const algoliaClient = getAlgoliaClient();
    if (payload.table === "prompts" && payload.type === "DELETE") {
      log.info("Deleting object with ID", { objectId: promptId });
      response = await algoliaClient.deleteObject({
        indexName: "prompts",
        objectID: promptId,
      });
    } else {
      log.info("Creating/updating object", {
        objectId: promptId,
        body: promptBody,
      });
      response = await algoliaClient.addOrUpdateObject({
        indexName: "prompts",
        objectID: promptId,
        body: promptBody as unknown as Record<string, unknown>,
      });
    }

    return generateResponse(StatusCodes.CREATED, {
      response: JSON.stringify(response),
    });
  } catch (error) {
    log.error("Webhook error:", { error: (error as Error).stack });

    const errorMessage = error instanceof Error
      ? error.message
      : "Unknown error";

    return generateResponse(StatusCodes.INTERNAL_SERVER_ERROR, {
      error: errorMessage,
    });
  } finally {
    if (db) {
      await db.end();
    }
  }
});
