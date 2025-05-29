import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const externalModuleData = (await prisma.externalModule.findUnique({
		include: { user: true },
		where: {
			id: params.externalModuleId,
		},
	})) as ExternalModuleData;
	return { externalModuleData };
};
