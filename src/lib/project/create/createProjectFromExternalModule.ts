import prisma from '$lib/prisma';
import { ProjectSchema } from '$lib/schemas/ProjectSchema';
import { error } from '@sveltejs/kit';
import type { ProjectData } from '../data/ProjectData';

export async function createProjectFromExternalModule(
	externalModuleId: string,
	userId: string,
): Promise<ProjectData> {
	const externalModule = await prisma.externalModule.findUnique({
		where: { id: externalModuleId },
	});

	if (!externalModule) {
		throw error(400, 'External module not found to create project from');
	}

	const data = ProjectSchema.omit({
		id: true,
		userId: true,
		createdAt: true,
		updatedAt: true,
	}).parse(externalModule);

	const projectData = await prisma.project.create({
		data: { ...data, userId, basedOnId: externalModuleId },
	});
	return projectData as unknown as ProjectData;
}
