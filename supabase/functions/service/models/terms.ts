import BaseEntity, { HasDefault } from "./base_entity.ts";

class Term extends BaseEntity {
  @HasDefault()
  createdAt!: Date;

  description!: string;

  @HasDefault()
  id!: string;

  localeId!: string;

  name!: string;

  parentTermId!: string | null;

  taxonomyId!: string;

  @HasDefault()
  updatedAt!: Date;
}

export default Term;
