export interface Prompt {
  id: string;
  name: string;
  prompt: string;
  is_public: boolean;
  is_latest_version: boolean;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
  terms: Array<{
    id: string;
    name: string;
    taxonomy_id: string;
    taxonomy_name: string;
  }>;
}

export interface PromptRecord {
  id: string;
  name: string;
  prompt: string;
  is_public: boolean;
  is_latest_version: boolean;
  parent_prompt_id?: string;
  version: number;
  locale_id: string;
  count_reaction_up: number;
  count_reaction_down: number;
  count_favorite: number;
  created_at: string;
  updated_at: string;
  created_by: string;
}

export interface PromptTermRecord {
  prompt_id: string;
  term_id: string;
  created_at: string;
}

export interface PromptWebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: PromptRecord | PromptTermRecord;
  old_record?: PromptRecord | PromptTermRecord;
  schema: string;
}
