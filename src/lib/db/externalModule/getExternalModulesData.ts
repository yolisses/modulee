import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { error } from '@sveltejs/kit';
import type { RootFilterQuery } from 'mongoose';
import { ExternalModuleModel } from './ExternalModuleModel';
import type { PaginationResult } from './PaginationResult';

type Params = {
	text?: string;
	sort?: string;
};

export async function getExternalModulesData(
	params: Params,
): Promise<PaginationResult<ExternalModuleData>> {
	const { text, sort } = params;

	const filter: RootFilterQuery<ExternalModuleData> = {};
	if (text) {
		filter.$text = { $search: text };
	}

	const query = ExternalModuleModel.find(filter);

	// TODO add remaining sort options
	// TODO refactor this
	// 'likes' | 'createdAtDesc' | 'downloadsInAllTime' | 'downloadsInLastMonth'
	if (!sort) {
		if (text) {
			query.sort({ score: { $meta: 'textScore' } });
		}
	} else if (sort === 'likes') {
		query.sort({ likesCount: 'desc' });
	} else if (sort === 'createdAtDesc') {
		query.sort({ createAt: 'desc' });
	} else {
		error(400, 'Invalid sort option');
	}

	const limit = 3;
	query.limit(limit);

	const items = (await query.populate('user')).map((r) => r.toObject());
	return { items, nextCursor: 'debugNextCursor' };
}
