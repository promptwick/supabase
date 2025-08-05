import BaseEntity, { HasDefault, PrimaryKey } from "./base_entity.ts";

class Prompt extends BaseEntity {
  @HasDefault()
  @PrimaryKey()
  id!: string;

  createdBy!: string;

  updatedBy!: string;

  @HasDefault()
  createdAt!: Date;

  @HasDefault()
  updatedAt!: Date;

  @HasDefault()
  version!: number;

  name!: string;

  @HasDefault()
  isPublic!: boolean;

  @HasDefault()
  isLatestVersion!: boolean;

  parentPromptId!: string | null;
}

export default Prompt;
