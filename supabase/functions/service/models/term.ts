import BaseEntity from "./base_entity.ts";


class Term extends BaseEntity {
  static override primaryKeys = ["id"];
  static override defaultFields = ["id", "createdAt", "updatedAt"];

  id!: string;
  name!: string;
  taxonomyId!: string;
  localeId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export default Term;
