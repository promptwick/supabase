import type { Context, Next } from "jsr:@hono/hono";

import { createClient, SupabaseClient } from "jsr:@supabase/supabase-js";
import { env } from "jsr:@hono/hono/adapter";
import { HTTPException } from "jsr:@hono/hono/http-exception";

declare module "jsr:@hono/hono" {
  interface ContextVariableMap {
    supabase: SupabaseClient;
  }
}

type SupabaseEnv = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
};

export const withSupabase = async (c: Context, next: Next) => {
  const supabaseEnv = env<SupabaseEnv>(c);
  const supabaseUrl = supabaseEnv.SUPABASE_URL;
  const supabaseAnonKey = supabaseEnv.SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("SUPABASE_URL missing!");
  }

  if (!supabaseAnonKey) {
    throw new Error("SUPABASE_ANON_KEY missing!");
  }

  // Get Authorization header for auth context
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    throw new HTTPException(401, { message: "Authorization header required" });
  }

  // Create Supabase client with auth context
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: { Authorization: authHeader },
    },
  });

  c.set("supabase", supabase);

  await next();
};
