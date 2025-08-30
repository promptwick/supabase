import BaseEntity from "./base_entity.ts";


class UserPromptFavorite extends BaseEntity {
  static override primaryKeys = ["userId", "promptId"];
  static override defaultFields = ["userId", "promptId", "createdAt"];

  userId!: string;
  promptId!: string;
  createdAt!: Date;
}

export default UserPromptFavorite;
