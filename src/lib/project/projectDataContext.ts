import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';
import type { ProjectData } from './ProjectData';

export type ProjectDataContext = {
	projectData: ProjectData;
};

const projectDataContextKey = Symbol('projectDataContextKey');

export function setProjectDataContext(projectDataContext: ProjectDataContext) {
	setContext(projectDataContextKey, projectDataContext);
}

export function getProjectDataContext() {
	return getContextOrThrow<ProjectDataContext>(projectDataContextKey);
}
