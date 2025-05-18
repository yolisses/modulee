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
	console.warn('Not implemented');
	const modules = await prisma.externalModule.findMany({
		include: { user: true },
	});
	return { items: modules, nextCursor: null };
}
