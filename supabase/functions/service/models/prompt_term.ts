import BaseEntity, { HasDefault, PrimaryKey } from "./base_entity.ts";

class PromptTerm extends BaseEntity {
  @HasDefault()
  @PrimaryKey()
  id!: string;

  promptId!: string;
  termId!: string;

  @HasDefault()
  createdAt!: Date;

  @HasDefault()
  updatedAt!: Date;
}

export default PromptTerm;
