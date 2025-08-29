// controllers/user_prompt_reactions.ts
import { Context } from 'jsr:@hono/hono';
import { StatusCodes } from 'npm:http-status-codes';
import Database from '../models/database.ts';
import UserPromptReaction from '../models/user_prompt_reaction.ts';
import { UserPromptReactionDeleteParams, UserPromptReactionPostBody } from '../schemas/user_prompt_reaction.ts';

/**
 * Handles the creation of a user prompt reaction.
 *
 * @param c - The request context containing the user and request data.
 * @returns A JSON response indicating success with HTTP status 201 (Created).
 */
export const createUserPromptReaction = async (c: Context) => {
	const { promptId, reactionType } = c.get('params') as unknown as UserPromptReactionPostBody;
	const { promptId } = c.get('params') as unknown as UserPromptReactionPostParams;
	const db = Database.instance;

	const user = c.get('user');

	const reaction = new UserPromptReaction();
	reaction.userId = user.id;
	reaction.promptId = promptId;
	reaction.reactionType = reactionType;
	reaction.createdAt = new Date();

	await db.insert('user_prompt_reactions', reaction);

	return c.json({ success: true }, StatusCodes.CREATED);
};

/**
 * Handles the deletion of a user prompt reaction.
 *
 * @param c - The request context containing the user and prompt ID.
 * @returns A JSON response indicating success with HTTP status 200 (OK).
 */
export const deleteUserPromptReaction = async (c: Context) => {
	const { promptId } = c.get('params') as unknown as UserPromptReactionDeleteParams;
	const db = Database.instance;

	const user = c.get('user');

	await db.query(
		`DELETE FROM user_prompt_reactions WHERE user_id = $1 AND prompt_id = $2`,
		[user.id, promptId],
	);

	return c.json({ success: true }, StatusCodes.OK);
};
