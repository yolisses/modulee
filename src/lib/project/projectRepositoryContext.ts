import { setContext, getContext } from 'svelte';
import type { ProjectsRepository } from './ProjectsRepository';

const projectsRepositoryKey = Symbol('projectsRepository');

export function setProjectsRepositoryContext(projectsRepository: ProjectsRepository) {
	setContext(projectsRepositoryKey, projectsRepository);
}

export function getProjectsRepositoryContext(): ProjectsRepository {
	return getContext(projectsRepositoryKey) as ProjectsRepository;
}
