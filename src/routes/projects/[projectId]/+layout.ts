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

	return { projectData };
};
