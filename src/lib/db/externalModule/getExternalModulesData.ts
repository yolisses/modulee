import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { error } from '@sveltejs/kit';
import type { RootFilterQuery } from 'mongoose';
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
	const { text, sort, cursor } = params;

	const filter: RootFilterQuery<ExternalModuleData> = {};
	if (text) {
		filter.$text = { $search: text };
	}

	let query = ExternalModuleModel.find(filter);

	// TODO add remaining sort options
	// TODO refactor this
	// 'likes' | 'createdAtDesc' | 'downloadsInAllTime' | 'downloadsInLastMonth'
	if (!sort) {
		if (text) {
			query.sort({ score: { $meta: 'textScore' } });
		} else {
			query.sort('_id');
		}
	} else if (sort === 'likes') {
		query.sort({ likesCount: 'desc' });
	} else if (sort === 'createdAtDesc') {
		query.sort({ createAt: 'desc' });
	} else {
		error(400, 'Invalid sort option');
	}

	const pageLimit = 3;
	query.limit(pageLimit + 1);

	if (cursor) {
		query = query.where('_id').gte(cursor);
	}

	const items = (await query.populate('user')).map((r) => r.toObject());
	const nextCursor = items.length < pageLimit + 1 ? null : items.at(-1)!._id.toString();
	items.pop();
	return { items, nextCursor };
}
