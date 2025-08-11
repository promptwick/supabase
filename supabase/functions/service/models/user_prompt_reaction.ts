import BaseEntity from "./base_entity.ts";


class UserPromptReaction extends BaseEntity {
  static override primaryKeys = ["id"];
  static override defaultFields = ["id", "createdAt", "updatedAt"];

  id!: string;
  userId!: string;
  promptId!: string;
  reactionType!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export default UserPromptReaction;
