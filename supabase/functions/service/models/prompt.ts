import BaseEntity, { HasDefault, PrimaryKey } from './base_entity.ts';

class Prompt extends BaseEntity {
	@HasDefault()
	@PrimaryKey()
	id!: string;

	@HasDefault()
	countFavorite!: number;

	@HasDefault()
	countReactionDown!: number;

	@HasDefault()
	countReactionUp!: number;

	createdBy!: string;

	@HasDefault()
	createdAt!: Date;

	@HasDefault()
	isLatestVersion!: boolean;

	@HasDefault()
	isPublic!: boolean;

	localeId!: string;

	name!: string;

	parentPromptId!: string | null;

	prompt!: string;

	@HasDefault()
	updatedAt!: Date;

	updatedBy!: string;

	@HasDefault()
	version!: number;
}

export default Prompt;
