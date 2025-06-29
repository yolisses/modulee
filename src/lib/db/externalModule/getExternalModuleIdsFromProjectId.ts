import prisma from '$lib/prisma';
import type { ProjectData } from '$lib/project/data/ProjectData';
import { getExternalModuleIdsFromProject } from './getExternalModuleIdsFromProject';

export async function getExternalModuleIdsFromProjectId(
	projectId: string,
): Promise<string[] | undefined> {
	if (!projectId) return undefined;
	const project = (await prisma.project.findUnique({
		where: { id: projectId },
	})) as ProjectData | null;

	if (!project) return undefined;
	return getExternalModuleIdsFromProject(project);
}
