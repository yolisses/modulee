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

	const query = ExternalModuleModel.find();
	query.limit(limit);

	if (!sort) {
		query.sort({ _id: 'desc' });
		if (cursor) {
			query.where({ _id: { $lte: cursor } });
		}
	} else if (sort === 'likeCount') {
		query.sort({ likeCount: 'desc' });
		if (cursor) {
			query.where({ likeCount: { $lte: cursor } });
		}
	}

	const documents = await query;
	const items = documents.map((d) => d.toObject());

	let nextCursor: null | string = null;
	const hasNext = items.length === limit;
	if (hasNext) {
		const lastItem = items.at(-1)!;
		if (!sort) {
			nextCursor = lastItem._id.toString();
		} else if (sort === 'likeCount') {
			nextCursor = lastItem.likeCount.toString();
		}
	}

	return {
		nextCursor,
		items: items.slice(0, pageLimit),
	};
}
