import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';

export async function getExternalModuleData(externalModuleId: string): Promise<ExternalModuleData> {
	const data = await prisma.externalModule.findUnique({
		include: { user: true },
		where: { id: externalModuleId },
	});
	if (!data) {
		throw new Error(`External module with id ${externalModuleId} not found`);
	}
	return data;
}
