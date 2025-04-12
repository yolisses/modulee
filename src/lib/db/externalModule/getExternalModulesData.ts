import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import type { RootFilterQuery } from 'mongoose';
import { ExternalModuleModel } from './ExternalModuleModel';

type Params = {
	text?: string;
	sort?: 'likes' | 'createdAtDesc' | 'downloadsInAllTime' | 'downloadsInLastMonth';
};

export async function getExternalModulesData(params: Params): Promise<ExternalModuleData[]> {
	const { text, sort } = params;

	const filter: RootFilterQuery<ExternalModuleData> = {};
	if (text) {
		filter.$text = { $search: text };
	}

	const query = ExternalModuleModel.find(filter);

	if (sort === 'likes') {
		query.sort({ likesCount: 'desc' });
	} else if (sort === 'createdAtDesc') {
		query.sort({ createAt: 'desc' });
	} else if (text) {
		query.sort({ score: { $meta: 'textScore' } });
	}

	return (await query.populate('user')).map((r) => r.toObject());
}
