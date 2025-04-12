import { getExternalModulesRepository } from '$lib/module/externalModule/getExternalModulesRepository';
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

	const externalModuleIds = projectData.graph.externalModuleReferences.map(
		(externalModuleReference) => externalModuleReference.id,
	);
	const externalModulesData =
		await externalModulesRepository.getExternalModulesById(externalModuleIds);

	return { projectData, externalModulesData };
};
