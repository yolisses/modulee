import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';
import type { PaginationResult } from './PaginationResult';

type Params = {
	text?: string;
	sort?: string;
	cursor?: string;
	userId?: string;
	likedBy?: string;
};

const PAGE_LIMIT = 20;

export async function getExternalModulesData(
	params: Params,
): Promise<PaginationResult<ExternalModuleData>> {
	const { cursor, userId, sort, text, likedBy } = params;

	const results = await prisma.externalModule.findMany({
		where: {
			...(userId && !likedBy && { userId }),
			...(likedBy && { likes: { some: { userId: likedBy } } }),
			...(text && { OR: [{ name: { search: text } }, { description: { search: text } }] }),
		},
		take: PAGE_LIMIT + 1,
		skip: cursor ? 1 : 0,
		cursor: cursor ? { id: cursor } : undefined,
		include: { user: { select: { username: true } } },
		orderBy: sort
			? { [sort]: 'desc' }
			: text
				? { _relevance: { sort: 'desc', search: text, fields: ['name', 'description'] } }
				: { likeCount: 'desc' },
	});

	const hasNextPage = results.length > PAGE_LIMIT;
	const items = hasNextPage ? results.slice(0, PAGE_LIMIT) : results;

	return {
		items,
		nextCursor: hasNextPage ? items[items.length - 1].id : null,
	};
}
