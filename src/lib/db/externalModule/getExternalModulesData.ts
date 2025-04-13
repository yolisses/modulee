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
	const { cursor } = params;

	const pageLimit = 3;
	const limit = pageLimit + 1;

	const query = ExternalModuleModel.find();
	query.limit(limit);
	query.sort({ _id: 'desc' });

	if (cursor) {
		query.where({ _id: { $lte: cursor } });
	}

	const documents = await query;
	const items = documents.map((d) => d.toObject());

	let nextCursor: null | string = null;
	const hasNext = items.length === limit;
	if (hasNext) {
		nextCursor = items.at(-1)!._id.toString();
	}

	return {
		nextCursor,
		items: items.slice(0, pageLimit),
	};
}
