import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';
import type { ModuleType } from '$lib/project/ModuleType';
import type { PaginationResult } from './PaginationResult';
import { sanitizeTextQuery } from './sanitizeTextQuery';

type Params = {
	text?: string;
	sort?: string;
	cursor?: string;
	userId?: string;
	likedBy?: string;
	validIds?: string[];
	moduleType?: ModuleType;
};

const PAGE_LIMIT = 20;

export async function getExternalModulesData(
	params: Params,
): Promise<PaginationResult<ExternalModuleData>> {
	const { sort, cursor, userId, likedBy, validIds, moduleType } = params;

	// Sanitize search text to avoid breaking the query (remove special characters)
	let { text } = params;
	text = text ? sanitizeTextQuery(text) : undefined;

	const results = await prisma.externalModule.findMany({
		where: {
			...(userId && { userId }),
			...(moduleType && { moduleType }),
			...(validIds && { id: { in: validIds } }),
			...(likedBy && { likes: { some: { userId: likedBy } } }),
			...(text && {
				OR: [{ name: { search: text } }, { description: { search: text } }],
			}),
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

	// Map results to ExternalModuleData, adding missing fields (set to default or fetch if available)
	const mappedItems: ExternalModuleData[] = items.map((item) => ({
		...item,
		version: (item as any).version ?? '', // Set default or fetch actual value
		usageCount: (item as any).usageCount ?? 0, // Set default or fetch actual value
	}));

	return {
		items: mappedItems,
		nextCursor: hasNextPage ? mappedItems[mappedItems.length - 1].id : null,
	};
}
