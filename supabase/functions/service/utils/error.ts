import { getReasonPhrase } from "npm:http-status-codes";
import { HTTPException } from "jsr:@hono/hono/http-exception";
import { Context } from "jsr:@hono/hono";
import { ErrorResponse } from "../types/error.ts";

export class ApiError extends HTTPException {
  public readonly reason?: string;
  public readonly details?: Record<string, unknown>;

  constructor(
    status: number,
    message: string,
    details?: Record<string, unknown>
  ) {
    super(status as 400 | 401 | 403 | 404 | 500, { message });
    this.name = "ApiError";
    this.details = details;
  }
}

export const createErrorResponse = (
  c: Context,
  status: number,
  message: string,
  details?: Record<string, unknown>
): ErrorResponse => {
  return {
    error: {
      code: status,
      status: getReasonPhrase(status),
      message,
      details,
      timestamp: new Date().toISOString(),
      path: c.req.path,
    },
    success: false,
  };
};

export function throwApiError(
  status: number,
  message: string,
  details?: Record<string, unknown>
): never {
  throw new ApiError(status, message, details);
}
