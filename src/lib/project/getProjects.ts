import prisma from '$lib/prisma';
import type { ProjectData } from './ProjectData';

export async function getProjects(userId: string) {
	const projectsData = await prisma.project.findMany({ where: { userId } });
	return projectsData as unknown as ProjectData[];
}
