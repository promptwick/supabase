import { Client } from "jsr:@db/postgres";

import logger from "../utils/logger.ts";

const log = logger.child("models.database");

/**
 * Creates and connects to a PostgreSQL database client using the Supabase database URL.
 * 
 * This function retrieves the database connection string from the SUPABASE_DB_URL environment
 * variable, creates a new database client instance, establishes a connection, and returns
 * the connected client for database operations.
 * 
 * @returns A Promise that resolves to a connected PostgreSQL Client instance
 * @throws Will throw an error if the database connection fails or if SUPABASE_DB_URL is not set
 * 
 * @example
 * ```typescript
 * const client = await getDatabaseClient();
 * // Use client for database operations
 * await client.end(); // Remember to close the connection when done
 * ```
 */
export const getDatabaseClient = async (): Promise<Client> => {
  const dsn = Deno.env.get("SUPABASE_DB_URL");

  log.debug("Creating new database client with DSN:", { dsn });
  const client = new Client(dsn);

  await client.connect();

  return client;
};
