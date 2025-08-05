import BaseEntity, { HasDefault, PrimaryKey } from "./base_entity.ts";

class UserFavoritePrompt extends BaseEntity {
  @PrimaryKey()
  userId!: string;

  @PrimaryKey()
  promptId!: string;

  @HasDefault()
  createdAt!: Date;
}

export default UserFavoritePrompt;
