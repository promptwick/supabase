import BaseEntity from "./base_entity.ts";

class PromptTerm extends BaseEntity {
	static override primaryKeys = ["promptId", "termId"];
	static override defaultFields = ["createdAt"];

	promptId!: string;

	termId!: string;

	createdAt!: Date;
}

export default PromptTerm;
