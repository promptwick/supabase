import BaseEntity from './base_entity.ts';


class Prompt extends BaseEntity {
	static override primaryKeys = ["id"];
	static override defaultFields = [
		"id",
		"countFavorite",
		"countReactionDown",
		"countReactionUp",
		"createdAt",
		"isLatestVersion",
		"isPublic",
		"updatedAt",
		"version"
	];

	id!: string;
	countFavorite!: number;
	countReactionDown!: number;
	countReactionUp!: number;
	createdBy!: string;
	createdAt!: Date;
	isLatestVersion!: boolean;
	isPublic!: boolean;
	localeId!: string;
	name!: string;
	parentPromptId!: string | null;
	prompt!: string;
	updatedAt!: Date;
	updatedBy!: string;
	version!: number;
}

export default Prompt;
