import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';

export async function getExternalModuleData(externalModuleId: string) {
	const externalModuleData = (await prisma.externalModule.findUnique({
		include: { user: true },
		where: { id: externalModuleId },
	})) as ExternalModuleData;
	return externalModuleData;
}
