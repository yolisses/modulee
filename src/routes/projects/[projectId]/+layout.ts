import { getExternalModulesRepository } from '$lib/module/getExternalModulesRepository';
import { getProjectsRepository } from '$lib/project/getProjectsRepository';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const { projectId } = params;
	const projectsRepository = getProjectsRepository();
	await projectsRepository.initialize();
	const projectData = await projectsRepository.getProject(projectId);

	if (!projectData) {
		error(404, { message: 'Project not found' });
	}

	const externalModulesRepository = getExternalModulesRepository();
	await externalModulesRepository.initialize();
	const externalModulesData = await externalModulesRepository.getExternalModules();

	return { projectData, externalModulesData };
};
