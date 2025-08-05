import BaseEntity, { HasDefault, PrimaryKey } from "./base_entity.ts";

class PromptTerm extends BaseEntity {
  @PrimaryKey()
  promptId!: string;

  @PrimaryKey()
  termId!: string;

  @HasDefault()
  createdAt!: Date;
}

export default PromptTerm;
