import { Context, Next } from "jsr:@hono/hono";
import { HTTPException } from "jsr:@hono/hono/http-exception";
import { StatusCodes } from "npm:http-status-codes";

import { ApiError, createErrorResponse } from "../utils/error.ts";
import logger from "../utils/logger.ts";

const log = logger.child({ namespace: 'middlewares.error-handler' });

export const errorHandler = async (c: Context, next: Next): Promise<Response | void> => {
  try {
    await next();
  } catch (err) {
    log.error("Error caught by error handler:", err);

    if (err instanceof ApiError) {
      // Handle our custom API errors with structured response
      const errorResponse = createErrorResponse(
        c,
        err.status,
        err.message,
        err.reason,
        err.details
      );
      return c.json(errorResponse, err.status);
    } else if (err instanceof HTTPException) {
      // Handle Hono HTTPExceptions
      const errorResponse = createErrorResponse(
        c,
        err.status,
        err.message || "HTTP Exception",
        "HTTP_EXCEPTION"
      );
      return c.json(errorResponse, err.status);
    } else if (err instanceof Error) {
      // Handle generic errors
      log.error("Unhandled error:", err.stack);
      const errorResponse = createErrorResponse(
        c,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "An internal server error occurred",
        "INTERNAL_ERROR",
        { originalMessage: err.message }
      );
      return c.json(errorResponse, StatusCodes.INTERNAL_SERVER_ERROR);
    } else {
      // Handle unknown errors
      log.error("Unknown error type:", err);
      const errorResponse = createErrorResponse(
        c,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred",
        "UNKNOWN_ERROR"
      );
      return c.json(errorResponse, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
};
