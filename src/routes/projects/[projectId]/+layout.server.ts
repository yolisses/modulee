import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import prisma from '$lib/prisma';
import type { ProjectData } from '$lib/project/ProjectData';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const project = await prisma.project.findUnique({ where: { id: params.projectId } });

	if (!project) {
		error(404, { message: 'Project not found' });
	}

	// TODO load external modules data from remote repository
	const externalModulesData: ExternalModuleData[] = [];

	return {
		externalModulesData,
		projectData: project as ProjectData,
	};
};
