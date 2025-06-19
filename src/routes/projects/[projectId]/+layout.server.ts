import { getExternalModuleIdsFromProject } from '$lib/db/externalModule/getExternalModuleIdsFromProject';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';
import type { ProjectData } from '$lib/project/ProjectData';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const project = (await prisma.project.findUnique({
		where: { id: params.projectId },
	})) as ProjectData | null;

	if (!project) {
		error(404, { message: 'Project not found' });
	}

	// TODO get external modules from external modules recursively
	const externalModulesData = (await prisma.externalModule.findMany({
		where: { id: { in: getExternalModuleIdsFromProject(project) } },
	})) as unknown as ExternalModuleData[];

	return { externalModulesData, projectData: project };
};
