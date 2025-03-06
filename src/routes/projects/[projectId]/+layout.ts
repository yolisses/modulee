import { getProjectsRepository } from '$lib/project/getProjectsRepository';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const { projectId } = params;
	const projectsRepository = getProjectsRepository();
	await projectsRepository.initialize();
	const projectData = await projectsRepository.getProject(projectId);
	return { projectData };
};
