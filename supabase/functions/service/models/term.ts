import BaseEntity, { HasDefault, PrimaryKey } from "./base_entity.ts";

class Term extends BaseEntity {
  @HasDefault()
  @PrimaryKey()
  id!: string;

  name!: string;

  taxonomyId!: string;

  localeId!: string;

  @HasDefault()
  createdAt!: Date;

  @HasDefault()
  updatedAt!: Date;
}

export default Term;
