import BaseEntity from "./base_entity.ts";


class UserPromptReaction extends BaseEntity {
  static override primaryKeys = ["userId", "promptId"];
  static override defaultFields = ["userId", "promptId", "reactionType", "createdAt"];

  userId!: string;
  promptId!: string;
  reactionType!: string;
  createdAt!: Date;
}

export default UserPromptReaction;
