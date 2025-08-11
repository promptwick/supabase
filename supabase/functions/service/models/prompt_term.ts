import BaseEntity from './base_entity.ts';

class PromptTerm extends BaseEntity {
	static override primaryKeys = ['id'];
	static override defaultFields = ['id', 'createdAt', 'updatedAt'];

	id!: string;

	promptId!: string;
  
	termId!: string;

	createdAt!: Date;

	updatedAt!: Date;
}

export default PromptTerm;
