import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { ExternalModuleModel } from './ExternalModuleModel';
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

	const pageLimit = 3;
	const limit = pageLimit + 1;

	let filter = {};
	let sortOptions = {};

	if (cursor) {
		const cursorData = JSON.parse(cursor);

		if (!sort) {
			sortOptions = { _id: -1 };
			filter = { _id: { $lte: cursorData._id } };
		} else if (sort === 'likeCount') {
			sortOptions = { likeCount: -1, _id: -1 };
			filter = {
				$or: [
					{ likeCount: { $lt: cursorData.likeCount } },
					{
						likeCount: cursorData.likeCount,
						_id: { $lte: cursorData._id },
					},
				],
			};
		} else if (sort === 'updatedAt') {
			sortOptions = { updatedAt: -1, _id: -1 };
			filter = {
				$or: [
					{ updatedAt: { $lt: cursorData.updatedAt } },
					{
						updatedAt: cursorData.updatedAt,
						_id: { $lte: cursorData._id },
					},
				],
			};
		} else {
			throw new Error('Invalid sorting option:' + sort);
		}
	} else {
		// Default sorting when no cursor
		if (!sort) {
			sortOptions = { _id: -1 };
		} else if (sort === 'likeCount') {
			sortOptions = { likeCount: -1, _id: -1 };
		} else if (sort === 'updatedAt') {
			sortOptions = { updatedAt: -1, _id: -1 };
		} else {
			throw new Error('Invalid sorting option:' + sort);
		}
	}

	const documents = await ExternalModuleModel.find(filter)
		.sort(sortOptions)
		.limit(limit)
		.populate('user')
		.exec();

	const items = documents.map((d) => d.toObject());

	let nextCursor: null | string = null;
	const hasNext = items.length === limit;
	if (hasNext) {
		const lastItem = items.at(-1)!;
		if (!sort) {
			nextCursor = JSON.stringify({
				_id: lastItem._id,
			});
		} else if (sort === 'likeCount') {
			nextCursor = JSON.stringify({
				_id: lastItem._id,
				likeCount: lastItem.likeCount,
			});
		} else if (sort === 'updatedAt') {
			nextCursor = JSON.stringify({
				_id: lastItem._id,
				updatedAt: lastItem.updatedAt,
			});
		} else {
			throw new Error('Invalid sorting option: ' + sort);
		}
	}

	return {
		nextCursor,
		items: items.slice(0, pageLimit),
	};
}
