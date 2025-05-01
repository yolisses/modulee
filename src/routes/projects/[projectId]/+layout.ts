import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { getProjectsRepository } from '$lib/project/getProjectsRepository';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async ({ params }) => {
	const { projectId } = params;
	const projectsRepository = getProjectsRepository();
	await projectsRepository.initialize();
	const projectData = await projectsRepository.getProject(projectId);

	if (!projectData) {
		error(404, { message: 'Project not found' });
	}

	// TODO load external modules data from remote repository
	const externalModuleIds = projectData.graph.externalModuleReferences.map(
		(externalModuleReference) => externalModuleReference.id,
	);
	const externalModulesData: ExternalModuleData[] = [];

	return { projectData, externalModulesData };
};
