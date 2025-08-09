import BaseEntity, { HasDefault, PrimaryKey } from "./base_entity.ts";

class UserPromptFavorite extends BaseEntity {
  @PrimaryKey()
  userId!: string;

  @PrimaryKey()
  promptId!: string;

  @HasDefault()
  createdAt!: Date;
}

export default UserPromptFavorite;
