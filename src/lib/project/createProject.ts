import prisma from '$lib/prisma';
import type { ProjectData } from './ProjectData';

export async function createProject(projectData: ProjectData) {
	const { id, name, userId, graph, moduleType } = projectData;
	return prisma.project.create({
		data: { id, name, graph, userId, moduleType },
	});
}
