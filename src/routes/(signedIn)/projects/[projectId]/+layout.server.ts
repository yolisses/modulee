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

	const externalModulesData = (await prisma.externalModule.findMany({
		where: {
			id: {
				in: project.graph.externalModuleReferences.map((externalModuleReference) => {
					return externalModuleReference.id;
				}),
			},
		},
	})) as ExternalModuleData[];

	return {
		externalModulesData,
		projectData: project,
	};
};
