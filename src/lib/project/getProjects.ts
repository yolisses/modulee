import prisma from '$lib/prisma';
import type { ProjectData } from './ProjectData';

export async function getProjects(userId: string): Promise<ProjectData[]> {
	return prisma.project.findMany({ where: { userId } });
}
