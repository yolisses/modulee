import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';
import type { ProjectData } from './ProjectData';

export type ProjectContext = {
	projectData: ProjectData;
};

const projectDataContextKey = Symbol('projectContextKey');

export function setProjectDataContext(projectContext: ProjectContext) {
	setContext(projectDataContextKey, projectContext);
}

export function getProjectDataContext() {
	return getContextOrThrow<ProjectContext>(projectDataContextKey);
}
