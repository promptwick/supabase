import BaseEntity, { HasDefault, PrimaryKey } from './base_entity.ts';

class UserPromptReaction extends BaseEntity {
  @PrimaryKey()
  userId!: string;

  @PrimaryKey()
  promptId!: string;

  reactionType!: 'up' | 'down';

  @HasDefault()
  createdAt!: Date;
}

export default UserPromptReaction;