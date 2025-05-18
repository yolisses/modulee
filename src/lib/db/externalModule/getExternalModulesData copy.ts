import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { type PipelineStage } from 'mongoose';
import { ExternalModuleModel } from './ExternalModuleModel';
import { getBasicUserDataStages } from './getBasicUserDataStages';
import { getStrategy } from './getStrategy';
import type { PaginationResult } from './PaginationResult';

type Params = {
	text?: string;
	sort?: string;
	cursor?: string;
};

const PAGE_LIMIT = 20;

export async function getExternalModulesData(
	params: Params,
): Promise<PaginationResult<ExternalModuleData>> {
	const { cursor, sort, text } = params;

	const strategy = getStrategy(sort, text);
	const cursorData = cursor ? JSON.parse(cursor) : null;

	const pipelineStages: PipelineStage[] = [];

	if (text) {
		pipelineStages.push(
			{ $match: { $text: { $search: text } } },
			{ $addFields: { score: { $meta: 'textScore' } } },
		);
	}

	if (cursorData) {
		const filterStage = strategy.getFilterStage(cursorData);
		pipelineStages.push(filterStage);
	}

	const sortStage = strategy.getSortStage();
	pipelineStages.push(sortStage);

	const LIMIT = PAGE_LIMIT + 1;

	pipelineStages.push({ $limit: LIMIT });
	pipelineStages.push(...getBasicUserDataStages());

	const items = await ExternalModuleModel.aggregate(pipelineStages);

	let nextCursor: null | string = null;
	const hasNext = items.length === LIMIT;
	if (hasNext) {
		const lastItem = items.at(-1)!;
		nextCursor = strategy.getNextCursorString(lastItem);
	}

	// Add id equals to _id for each item
	const mappedItems = items.slice(0, PAGE_LIMIT).map((item) => ({
		...item,
		id: item._id,
	}));

	return { nextCursor, items: mappedItems };
}
