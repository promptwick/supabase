import BaseEntity from "./base_entity.ts";

class PromptSearch extends BaseEntity {
  id!: string;

  createdBy!: string;

  updatedBy!: string;

  createdAt!: Date;

  updatedAt!: Date;

  version!: number;

  name!: string;

  content!: string;

  isPublic!: boolean;

  isLatestVersion!: boolean;

  parentPromptId!: string | null;

  terms: Record<string, string[]> = {};
}

export default PromptSearch;
