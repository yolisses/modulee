import prisma from '$lib/prisma';
import { ProjectSchema } from '$lib/schemas/ProjectSchema';
import { error } from '@sveltejs/kit';
import z from 'zod/v4';

export async function createProjectFromExternalModule(externalModuleId: string, userId: string) {
	const externaModule = await prisma.externalModule.findUnique({ where: { id: externalModuleId } });

	if (!externaModule) {
		error(400, 'External module not found to create project from');
	}

	const res = ProjectSchema.omit({
		id: true,
		userId: true,
		createdAt: true,
		updatedAt: true,
	}).safeParse(externaModule);

	if (!res.success) {
		error(400, z.prettifyError(res.error));
	}

	return prisma.project.create({
		data: { ...res.data, userId },
	});
}
