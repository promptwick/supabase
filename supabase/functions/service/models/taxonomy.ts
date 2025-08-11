import BaseEntity from "./base_entity.ts";


class Taxonomy extends BaseEntity {
  static override primaryKeys = ["id"];
  static override defaultFields = ["id", "createdAt", "updatedAt"];

  id!: string;
  name!: string;
  parentTaxonomyId!: string | null;
  localeId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export default Taxonomy;
