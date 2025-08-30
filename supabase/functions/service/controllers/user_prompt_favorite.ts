import { StatusCodes } from 'npm:http-status-codes';
import Database from '../models/database.ts';
import UserPromptFavorite from '../models/user_prompt_favorite.ts';
import { CreateUserPromptFavoriteBody, DeleteUserPromptFavoriteParams } from '../schemas/user_prompt_favorite.ts';
import { Context } from 'jsr:@hono/hono';
import { throwApiError } from '../utils/error.ts';

/**
 * Handles the creation of a user favorite prompt entry.
 *
 * Expects a JSON body containing the `promptId` and retrieves the authenticated user from the context.
 * Attempts to insert a new record into the `user_favorite_prompts` table associating the user with the prompt.
 * If the user has already favorited the prompt, responds with a conflict error.
 *
 * @param c - The request context containing the user and request data.
 * @returns A JSON response indicating success with HTTP status 201 (Created).
 * @throws {ApiError} If the user has already favorited the prompt (HTTP 409 Conflict) or on other database errors.
 */
export const createUserPromptFavorite = async (c: Context) => {
	const { promptId } = c.get('params') as unknown as CreateUserPromptFavoriteBody;

	const user = c.get('user');

	const db = Database.instance;

	try {
		const newUserPromptFavorite = new UserPromptFavorite();
		newUserPromptFavorite.userId = user.id;
		newUserPromptFavorite.promptId = promptId;
		newUserPromptFavorite.createdAt = new Date();

		await db.insert('user_prompt_favorites', newUserPromptFavorite);
	} catch (ex) {
		console.error('Error creating user favorite prompt:', ex);
		// Check for unique constraint violation (Postgres error code 23505)
		if (ex && typeof ex === 'object' && 'code' in ex && ex.code === '23505') {
			throwApiError(
				StatusCodes.CONFLICT,
				'User has already favorited this prompt',
			);
		}
		throw ex;
	}

	return c.body(null, StatusCodes.CREATED);
};

/**
 * Deletes a user's favorite prompt by prompt ID.
 *
 * This controller function retrieves the prompt ID from the request parameters and the user from the context.
 * It checks if the favorite prompt exists for the user in the database. If not found, it throws a NOT_FOUND error.
 * If found, it removes the favorite prompt entry from the database and returns a NO_CONTENT status.
 *
 * @param c - The request context containing parameters and user information.
 * @throws {ApiError} If the user favorite prompt is not found.
 * @returns A response with HTTP status 204 (No Content) on successful deletion.
 */
export const deleteUserPromptFavorite = async (c: Context) => {
	const { promptId } = c.get('params') as unknown as DeleteUserPromptFavoriteParams;

	const user = c.get('user');

	const db = Database.instance;

	const existingUserPromptFavorite = await db.queryOne<UserPromptFavorite>(
		UserPromptFavorite,
		`SELECT * FROM user_prompt_favorites WHERE user_id = $1 AND prompt_id = $2`,
		[user.id, promptId],
	);
	if (!existingUserPromptFavorite) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'Cannot remove favorite: User favorite prompt not found',
		);
	}

	await db.remove('user_prompt_favorites', existingUserPromptFavorite);

	return c.body(null, StatusCodes.NO_CONTENT);
};
