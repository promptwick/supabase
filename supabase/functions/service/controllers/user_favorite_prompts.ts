import { StatusCodes } from 'npm:http-status-codes';
import Database from '../models/database.ts';
import UserFavoritePrompt from '../models/user_favorite_prompts.ts';
import { UserFavoritePromptDeleteParams, UserFavoritePromptPostBody } from '../schemas/user_favorite_prompts.ts';
import { Context } from 'jsr:@hono/hono';
import { throwApiError } from '../utils/error.ts';

const createUserFavoritePrompt = async (c: Context) => {
	const { promptId } = await c.req.json<
		UserFavoritePromptPostBody
	>();

	const user = c.get('user');

	const db = Database.instance;

	try {
		const newUserFavoritePrompt = new UserFavoritePrompt();
		newUserFavoritePrompt.userId = user.id;
		newUserFavoritePrompt.promptId = promptId;
		newUserFavoritePrompt.createdAt = new Date();

		await db.insert('user_favorite_prompts', newUserFavoritePrompt);
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

	return c.json({ success: true }, StatusCodes.CREATED);
};

const deleteUserFavoritePrompt = async (c: Context) => {
	const { promptId } = c.req
		.param() as unknown as UserFavoritePromptDeleteParams;

	const user = c.get('user');

	const db = Database.instance;

	const existingUserFavoritePrompt = await db.queryOne<UserFavoritePrompt>(
		`SELECT * FROM user_favorite_prompts WHERE user_id = $1 AND prompt_id = $2`,
		[user.id, promptId],
	);
	if (!existingUserFavoritePrompt) {
		throwApiError(
			StatusCodes.NOT_FOUND,
			'Cannot remove favorite: User favorite prompt not found',
		);
	}

	await db.remove('user_favorite_prompts', existingUserFavoritePrompt);

	return c.status(StatusCodes.NO_CONTENT);
};

export { createUserFavoritePrompt, deleteUserFavoritePrompt };
