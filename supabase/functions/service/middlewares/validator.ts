import { Schema } from 'npm:joi';
import { StatusCodes } from 'npm:http-status-codes';
import type { Context, Next } from 'jsr:@hono/hono';
import { HTTPException } from 'jsr:@hono/hono/http-exception';

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
export const withValidation = (schema: Schema) => (c: Context, next: Next): void => {
	const { error } = schema.validate(c.req, {
		abortEarly: false, // Equivalent to allErrors: true
		allowUnknown: false,
		stripUnknown: true,
		convert: true, // Equivalent to coerceTypes: true
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
