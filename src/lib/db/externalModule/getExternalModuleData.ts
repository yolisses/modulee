import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';
import { error } from '@sveltejs/kit';

export async function getExternalModuleData(externalModuleId: string): Promise<ExternalModuleData> {
	const data = await prisma.externalModule.findUnique({
		include: { user: true },
		where: { id: externalModuleId },
	});
	if (!data) {
		error(404, 'External module not found');
	}
	return data as unknown as ExternalModuleData;
}
