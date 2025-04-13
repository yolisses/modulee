import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { set, Types } from 'mongoose';
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
	const { cursor, sort, text } = params;

	const strategy = getStrategy(sort, text);
	const cursorData = cursor ? JSON.parse(cursor) : null;

	const pageLimit = 3;
	const limit = pageLimit + 1;

	const filter = strategy.getFilter(cursorData);

	console.log(strategy, filter);
	const projection = strategy.getProjection();

	set('debug', true);
	const documents = await ExternalModuleModel.aggregate([
		{ $match: { $text: { $search: text } } },
		{ $addFields: { score: { $meta: 'textScore' } } },
		...(cursorData
			? [
					{
						$match: {
							$or: [
								{ score: { $lt: cursorData.score } },
								{ score: cursorData.score, _id: { $lte: new Types.ObjectId(cursorData._id) } },
							],
						},
					},
				]
			: []),
		{ $sort: { score: -1 } },
		{ $limit: 4 },
	]);
	set('debug', false);

	const items = documents;
	// const items = documents.map((d) => d.toObject());
	console.log(items.map((item) => item.name));

	let nextCursor: null | string = null;
	const hasNext = items.length === limit;
	if (hasNext) {
		const lastItem = items.at(-1)!;
		nextCursor = strategy.getNextCursorString(lastItem);
	}

	return { nextCursor, items: items.slice(0, pageLimit) };
}
