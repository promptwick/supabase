# Prompt Webhook

This Supabase Edge Function serves as a database webhook that listens to changes in the "prompts" table and updates an Algolia search index accordingly.

## Features

- **Real-time sync**: Automatically updates Algolia index when prompts are inserted, updated, or deleted
- **Complete data retrieval**: Fetches full prompt data including terms and taxonomies
- **Type-safe**: Written in TypeScript with proper type definitions
- **Error handling**: Comprehensive error handling and logging
- **CORS support**: Includes CORS headers for cross-origin requests

## Setup

### 1. Environment Variables

Add these environment variables to your Supabase project:

```bash
ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_API_KEY=your_algolia_admin_api_key
ALGOLIA_INDEX_NAME=prompts  # or your preferred index name
```

### 2. Deploy the Function

```bash
supabase functions deploy prompt-webhook
```

### 3. Set up Database Webhook

Create a database webhook in your Supabase dashboard or via SQL:

```sql
-- Create the webhook
INSERT INTO supabase_functions.hooks (
  hook_table_id,
  hook_name,
  type,
  function_name
) VALUES (
  (SELECT id FROM information_schema.tables WHERE table_name = 'prompts'),
  'prompt_webhook',
  'after',
  'prompt-webhook'
);
```

Or use the Supabase dashboard:
1. Go to Database > Webhooks
2. Create a new webhook
3. Set table: `prompts`
4. Set events: `INSERT`, `UPDATE`, `DELETE`
5. Set HTTP URL to your function endpoint

## How It Works

### INSERT/UPDATE Operations

1. Webhook receives payload from Supabase
2. Extracts prompt ID from the payload
3. Fetches complete prompt data with related terms and taxonomies
4. Transforms data for Algolia indexing
5. Updates the Algolia index

### DELETE Operations

1. Webhook receives payload with the deleted record
2. Extracts prompt ID
3. Removes the record from Algolia index

## Data Structure

The webhook transforms prompt data into this Algolia record structure:

```typescript
{
  objectID: string,           // Prompt ID
  id: string,
  name: string,
  prompt: string,
  is_public: boolean,
  is_latest_version: boolean,
  parent_prompt_id?: string,
  version: number,
  locale_id: string,
  count_reaction_up: number,
  count_reaction_down: number,
  count_favorite: number,
  created_at: string,
  updated_at: string,
  created_by: string,
  terms: ProcessedTerm[],     // Array of term objects
  term_names: string[],       // Array of term names for search
  taxonomy_names: string[],   // Array of taxonomy names for search
  _searchable_terms: string,  // Space-separated term names
  _searchable_taxonomies: string // Space-separated taxonomy names
}
```

## Customizing the Query

The function includes a placeholder query that fetches prompt data with related terms and taxonomies. Replace this section with your specific query:

```typescript
// TODO: Replace this query with your specific query
const { data: promptData, error: queryError } = await supabase
  .from('prompts')
  .select(`
    id,
    name,
    prompt,
    is_public,
    is_latest_version,
    parent_prompt_id,
    version,
    locale_id,
    count_reaction_up,
    count_reaction_down,
    count_favorite,
    created_at,
    updated_at,
    created_by,
    terms:prompt_terms(
      term:terms(
        id,
        name,
        taxonomy:taxonomies(
          id,
          name
        )
      )
    )
  `)
  .eq('id', promptId)
  .single()
```

## Testing

You can test the webhook by making changes to the prompts table:

```sql
-- Insert a new prompt
INSERT INTO prompts (name, prompt, is_public, locale_id, created_by) 
VALUES ('Test Prompt', 'This is a test prompt', true, 'en', 'user-id');

-- Update an existing prompt
UPDATE prompts SET name = 'Updated Test Prompt' WHERE id = 'your-prompt-id';

-- Delete a prompt
DELETE FROM prompts WHERE id = 'your-prompt-id';
```

Check the function logs in the Supabase dashboard to see the webhook execution.

## Monitoring

- Function logs are available in the Supabase dashboard under Functions
- Algolia operations are logged with their results
- Errors are caught and logged with detailed messages

## Security

- The function verifies that webhooks are only processed for the "prompts" table
- Uses Supabase service role key for database access
- Includes proper error handling to prevent information leakage
