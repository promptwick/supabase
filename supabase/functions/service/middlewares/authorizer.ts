import type { Context, Next } from "jsr:@hono/hono";
import { User } from "jsr:@supabase/supabase-js";
import { HTTPException } from "jsr:@hono/hono/http-exception";

declare module "jsr:@hono/hono" {
  interface ContextVariableMap {
    user: User;
  }
}

/**
 * Middleware that checks if the request has a valid authorization token.
 * If the token is missing or invalid, it throws an Unauthorized error.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 * @throws {Unauthorized} - If the authorization token is missing or invalid.
 */
export const withAuthorization = async (c: Context, next: Next) => {
  const supabase = c.get("supabase");

  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    throw new HTTPException(401, { message: error.message });
  }

  c.set("user", user.user);

  await next();
};

/**
 * Middleware that checks if the authenticated user has the specified permission.
 * If the user does not have the permission, it throws an Unauthorized error.
 *
 * @param permission - The permission to check.
 * @returns A middleware function.
 * @throws {Unauthorized} - If the user does not have the specified permission.
 */
export const withPermission =
  (permission: string) => (c: Context, next: Next) => {
    const user = c.get("user");

    if (!user) {
      throw new HTTPException(401, { message: "Unauthorized" });
    }

    if (!user.role || !user.role.includes(permission)) {
      throw new HTTPException(403, { message: "Forbidden" });
    }

    next();
  };
