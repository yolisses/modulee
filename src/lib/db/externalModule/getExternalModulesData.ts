import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';
import type { ProjectData } from '$lib/project/ProjectData';
import { getId } from '$lib/ui/getId';
import { error } from '@sveltejs/kit';
import z from 'zod/v4';
import { formatTsQuery } from './formatTsQuery';
import { ModuleTypeSchema } from './ModuleTypeSchema';
import type { PaginationResult } from './PaginationResult';

const PAGE_LIMIT = 20;

const sortEnum = z.enum(['createdAt', 'likeCount']);
const schema = z.object({
	sort: sortEnum.optional(),
	text: z.string().optional(),
	usedIn: z.string().optional(),
	userId: z.string().optional(),
	cursor: z.string().optional(),
	likedBy: z.string().optional(),
	moduleType: ModuleTypeSchema.optional(),
});

async function getValidIds(usedIn: string | undefined): Promise<string[] | undefined> {
	if (!usedIn) return undefined;
	const project = (await prisma.project.findUnique({
		where: { id: usedIn },
	})) as ProjectData | null;
	return project ? project.graph.externalModuleReferences.map(getId) : undefined;
}

export async function getExternalModulesData(
	params: object,
): Promise<PaginationResult<ExternalModuleData>> {
	const res = schema.safeParse(params);
	if (!res.success) {
		error(400, res.error);
	}
	let { text } = res.data;
	const { sort, cursor, userId, usedIn, likedBy, moduleType } = res.data;

	if (text) {
		text = formatTsQuery(text);
	}

	const validIds = await getValidIds(usedIn);

	const results = await prisma.externalModule.findMany({
		take: PAGE_LIMIT + 1,
		skip: cursor ? 1 : 0,
		cursor: cursor ? { id: cursor } : undefined,
		include: { user: { select: { username: true } } },
		orderBy: sort
			? { [sort]: 'desc' }
			: text
				? { _relevance: { sort: 'desc', search: text, fields: ['name', 'description'] } }
				: { likeCount: 'desc' },
		where: {
			...(userId && { userId }),
			...(moduleType && { moduleType }),
			...(validIds && { id: { in: validIds } }),
			...(likedBy && { likes: { some: { userId: likedBy } } }),
			...(text && {
				OR: [{ name: { search: text } }, { description: { search: text } }],
			}),
		},
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
