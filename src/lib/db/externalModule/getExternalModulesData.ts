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
	const data = await prisma.externalModule.findMany({
		include: { user: true },
	});
	const externalModuleData = data as unknown as ExternalModuleData[];
	return { items: externalModuleData, nextCursor: null };
}
