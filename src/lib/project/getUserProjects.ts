import prisma from '$lib/prisma';
import type { ProjectData } from './data/ProjectData';

export async function getUserProjects(userId: string) {
	const projectsData = await prisma.project.findMany({
		omit: { graph: true },
		orderBy: { updatedAt: 'desc' },
		where: { userId, NOT: { createdAt: { equals: prisma.project.fields.updatedAt } } },
	});
	return projectsData as unknown as ProjectData[];
}
