import BaseEntity, { HasDefault, PrimaryKey } from "./base_entity.ts";

class UserPromptReaction extends BaseEntity {
  @HasDefault()
  @PrimaryKey()
  id!: string;

  userId!: string;
  promptId!: string;
  reactionType!: string;

  @HasDefault()
  createdAt!: Date;

  @HasDefault()
  updatedAt!: Date;
}

export default UserPromptReaction;
