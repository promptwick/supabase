import BaseEntity, { HasDefault, PrimaryKey } from "./base_entity.ts";

class Taxonomy extends BaseEntity {
  @HasDefault()
  @PrimaryKey()
  id!: string;

  name!: string;

  parentTaxonomyId!: string | null;

  localeId!: string;

  @HasDefault()
  createdAt!: Date;

  @HasDefault()
  updatedAt!: Date;
}

export default Taxonomy;
