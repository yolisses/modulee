import prisma from '$lib/prisma';
import type { ProjectData } from './data/ProjectData';

export async function getProjects(userId: string) {
	const projectsData = await prisma.project.findMany({
		omit: { graph: true },
		orderBy: { updatedAt: 'desc' },
		where: { userId },
	});
	return projectsData as unknown as ProjectData[];
}
