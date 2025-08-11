import BaseEntity, { HasDefault, PrimaryKey } from "./base_entity.ts";

class UserPromptFavorite extends BaseEntity {
  @HasDefault()
  @PrimaryKey()
  id!: string;

  userId!: string;
  promptId!: string;

  @HasDefault()
  createdAt!: Date;

  @HasDefault()
  updatedAt!: Date;
}

export default UserPromptFavorite;
