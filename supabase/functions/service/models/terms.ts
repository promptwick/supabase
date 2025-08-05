import BaseEntity, { HasDefault } from "./base_entity.ts";

class Term extends BaseEntity {
  @HasDefault()
  id!: string;

  taxonomyId!: string;

  name!: string;

  description!: string;

  parentTermId!: string | null;

  localeId!: string;

  @HasDefault()
  createdAt!: Date;

  @HasDefault()
  updatedAt!: Date;
}

export default Term;
