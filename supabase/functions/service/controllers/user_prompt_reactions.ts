// controllers/user_prompt_reactions.ts
import { Context } from 'jsr:@hono/hono';
import { StatusCodes } from 'npm:http-status-codes';
import Database from '../models/database.ts';
import UserPromptReaction from '../models/user_prompt_reactions.ts';
import { userPromptReactionPostSchema, UserPromptReactionPostBody } from '../schemas/user_prompt_reactions.ts';
import { throwApiError } from '../utils/error.ts';

/**
 * Create a new user prompt reaction.
 */
export const createUserPromptReaction = async (c: Context) => {
  const { userId, promptId, reactionType } = await c.req.json<UserPromptReactionPostBody>();
  const db = Database.instance;

  const reaction = new UserPromptReaction();
  reaction.userId = userId;
  reaction.promptId = promptId;
  reaction.reactionType = reactionType;
  reaction.createdAt = new Date();

  await db.insert('user_prompt_reactions', reaction);

  return c.json({ success: true }, StatusCodes.CREATED);
};

/**
 * Delete a user prompt reaction.
 */
export const deleteUserPromptReaction = async (c: Context) => {
  const { userId, promptId } = c.req.query();
  const db = Database.instance;

  await db.query(
    `DELETE FROM user_prompt_reactions WHERE user_id = $1 AND prompt_id = $2`,
    [userId, promptId]
  );

  return c.json({ success: true }, StatusCodes.OK);
};