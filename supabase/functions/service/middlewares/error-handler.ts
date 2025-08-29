import { Context } from 'jsr:@hono/hono';
import { HTTPException } from 'jsr:@hono/hono/http-exception';
import { StatusCodes } from 'npm:http-status-codes';

import { ApiError, createErrorResponse } from '../utils/error.ts';
import logger from '../utils/logger.ts';

const log = logger.child('middlewares.error-handler');

export const errorHandler = (err: Error, c: Context): Response => {
	log.error('Error caught by error handler:', { error: err.message, stack: err.stack });

	if (err instanceof ApiError) {
		// Handle our custom API errors with structured response
		const errorResponse = createErrorResponse(
			c,
			err.status,
			err.message,
		);
		return c.json(errorResponse, err.status);
	} else if (err instanceof HTTPException) {
		// Handle Hono HTTPExceptions
		const errorResponse = createErrorResponse(
			c,
			err.status,
			err.message || 'HTTP Exception',
		);
		return c.json(errorResponse, err.status);
	} else if (err instanceof Error) {
		// Handle generic errors
		const errorResponse = createErrorResponse(
			c,
			StatusCodes.INTERNAL_SERVER_ERROR,
			'An internal server error occurred',
		);
		return c.json(errorResponse, StatusCodes.INTERNAL_SERVER_ERROR);
	} else {
		// Handle unknown errors
		const errorResponse = createErrorResponse(
			c,
			StatusCodes.INTERNAL_SERVER_ERROR,
			'An unexpected error occurred',
		);
		return c.json(errorResponse, StatusCodes.INTERNAL_SERVER_ERROR);
	}
};
