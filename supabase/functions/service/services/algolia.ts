import { searchClient } from 'npm:@algolia/client-search';
import { createFetchRequester } from 'npm:@algolia/requester-fetch';
import camelcaseKeys from 'npm:camelcase-keys';
import PromptSearch from '../models/prompt_search.ts';
import logger from '../utils/logger.ts';

const log = logger.child('services.algolia');

interface AlogliaConfig {
	applicationId: string;
	indexName: string;
	searchKey: string;
	writeKey: string;
}

const config = camelcaseKeys(JSON.parse(
	Deno.env.get('ALGOLIA_CONFIG') as string,
)) as AlogliaConfig;

const client = searchClient(config.applicationId, config.writeKey, {
	requester: createFetchRequester(),
});

export const searchAlgolia = async (query: string): Promise<PromptSearch[]> => {
	try {
		const searchResults = await client.searchSingleIndex({
			indexName: config.indexName,
			searchParams: query,
		});
		log.debug('Search Results:', { hits: searchResults.hits });

		return searchResults.hits.map((hit: unknown) => PromptSearch.fromJSON(PromptSearch, hit as Record<string, unknown>));
	} catch (error) {
		log.error('Error searching Algolia:', { error });
		throw error;
	}
};

export const saveAlgolia = async (data: PromptSearch) => {
	try {
		const response = await client.saveObject({
			indexName: config.indexName,
			body: data.toJSON(),
		});
		log.debug('Data added:', response);
	} catch (error) {
		log.error('Error adding data to Algolia:', { error });
		throw error;
	}
};
