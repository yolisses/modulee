import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { ExternalModuleModel } from './ExternalModuleModel';
import { getStrategy } from './getStrategy';
import type { PaginationResult } from './PaginationResult';

type Params = {
	text?: string;
	sort?: string;
	cursor?: string;
};

export async function getExternalModulesData(
	params: Params,
): Promise<PaginationResult<ExternalModuleData>> {
	const { cursor, sort } = params;

	const strategy = getStrategy(sort);
	const cursorData = cursor ? JSON.parse(cursor) : null;

	const pageLimit = 3;
	const limit = pageLimit + 1;

	const documents = await ExternalModuleModel.find(strategy.getFilter(cursorData))
		.sort(strategy.getSortOptions())
		.limit(limit)
		.populate('user')
		.exec();

	const items = documents.map((d) => d.toObject());

	let nextCursor: null | string = null;
	const hasNext = items.length === limit;
	if (hasNext) {
		const lastItem = items.at(-1)!;
		nextCursor = strategy.getNextCursorString(lastItem);
	}

	return { nextCursor, items: items.slice(0, pageLimit) };
}
