import { Schema } from "npm:joi";
import { StatusCodes } from "npm:http-status-codes";
import type { Context, Next } from "jsr:@hono/hono";
import { HTTPException } from "jsr:@hono/hono/http-exception";

export const withValidator =
  (schema: Schema) => (c: Context, next: Next): void => {
    const { error } = schema.validate(c.req, {
      abortEarly: false, // Equivalent to allErrors: true
      allowUnknown: false,
      stripUnknown: true,
      convert: true // Equivalent to coerceTypes: true
    });
    if (error) {
      const errorMessage = error.details.map((detail: { message: string }) => detail.message).join(', ');
      throw new HTTPException(StatusCodes.BAD_REQUEST, {
        message: errorMessage,
      });
    } else {
      next();
    }
  };
