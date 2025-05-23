import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';
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
	const { cursor } = params;

	const results = await prisma.externalModule.findMany({
		take: PAGE_LIMIT + 1,
		skip: cursor ? 1 : 0,
		orderBy: { createdAt: 'asc' },
		cursor: cursor ? { id: cursor } : undefined,
	});

	const hasNextPage = results.length > PAGE_LIMIT;
	const items = hasNextPage ? results.slice(0, PAGE_LIMIT) : results;

	return {
		items,
		nextCursor: hasNextPage ? items[items.length - 1].id : null,
	};
}
