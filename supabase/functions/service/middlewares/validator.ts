import { Schema } from 'npm:joi';
import { StatusCodes } from 'npm:http-status-codes';
import type { Context, Next } from 'jsr:@hono/hono';
import { HTTPException } from 'jsr:@hono/hono/http-exception';

import logger from '../utils/logger.ts';

const log = logger.child('middlewares/validator');

/**
 * Middleware factory that validates the incoming request using the provided schema.
 *
 * @param schema - The validation schema to apply to the request.
 * @returns A middleware function that validates the request against the schema.
 *          If validation fails, throws an HTTPException with a 400 status code and error details.
 *          If validation passes, calls the next middleware in the chain.
 *
 * @example
 * app.use(withValidation(mySchema));
 */
export const withValidation = (schema: Schema) => async (c: Context, next: Next): Promise<void> => {
	const params = c.req.param();
	const query = c.req.query();
	const body = await (async () => {
		const text = await c.req.text();
		return text ? JSON.parse(text) : null;
	})();

	const { error } = schema.validate({ params, query, body }, {
		abortEarly: false, // Equivalent to allErrors: true
		allowUnknown: false,
		stripUnknown: true,
		convert: true, // Equivalent to coerceTypes: true
	});
	if (error) {
		const errorMessage = error.details.map((detail: { message: string }) => detail.message).join(', ');
		log.error('Validation failed:', { error: errorMessage });
		throw new HTTPException(StatusCodes.BAD_REQUEST, {
			message: errorMessage,
		});
	} else {
		await next();
	}
};
