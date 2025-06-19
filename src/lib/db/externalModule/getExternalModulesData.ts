import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';
import z from 'zod/v4';
import { formatTsQuery } from './formatTsQuery';
import { ModuleTypeSchema } from './ModuleTypeSchema';
import type { PaginationResult } from './PaginationResult';
import { getExternalModuleIdsFromProjectId } from './getExternalModuleIdsFromProjectId';

const PAGE_LIMIT = 20;

const sortEnum = z.enum(['createdAt', 'likeCount']);
const schema = z.object({
	sort: sortEnum.optional(),
	text: z.string().optional(),
	userId: z.uuidv4().optional(),
	usedIn: z.string().optional(),
	cursor: z.string().optional(),
	likedBy: z.string().optional(),
	moduleType: ModuleTypeSchema.optional(),
});

export async function getExternalModulesData(
	arg: object,
): Promise<PaginationResult<ExternalModuleData>> {
	const res = schema.safeParse(arg);

	if (!res.success) {
		error(400, z.prettifyError(res.error));
	}

	let { text } = res.data;
	const { sort, cursor, userId, usedIn, likedBy, moduleType } = res.data;

	if (text) {
		text = formatTsQuery(text);
	}

	const validIds = usedIn ? await getExternalModuleIdsFromProjectId(usedIn) : undefined;

	const results = (await prisma.externalModule.findMany({
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
	})) as unknown as ExternalModuleData[];

	const hasNextPage = results.length > PAGE_LIMIT;
	const items = hasNextPage ? results.slice(0, PAGE_LIMIT) : results;

	return { items, nextCursor: hasNextPage ? items[items.length - 1].id : null };
}
