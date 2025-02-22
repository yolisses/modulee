import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';
import type { ProjectsRepository } from './ProjectsRepository';

export type ProjectsRepositoryContext = {
	projectsRepository?: ProjectsRepository;
};

const projectsRepositoryContextKey = Symbol('projectsRepositoryContextKey');

export function setProjectsRepositoryContext(projectsRepositoryContext: ProjectsRepositoryContext) {
	setContext(projectsRepositoryContextKey, projectsRepositoryContext);
}

export function getProjectsRepositoryContext() {
	return getContextOrThrow<ProjectsRepositoryContext>(projectsRepositoryContextKey);
}
