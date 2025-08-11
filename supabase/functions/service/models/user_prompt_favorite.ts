import BaseEntity from "./base_entity.ts";


class UserPromptFavorite extends BaseEntity {
  static override primaryKeys = ["id"];
  static override defaultFields = ["id", "createdAt", "updatedAt"];

  id!: string;
  userId!: string;
  promptId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export default UserPromptFavorite;
