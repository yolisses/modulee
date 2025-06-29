import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { getContext, setContext } from 'svelte';
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

export function getProjectDataContextOrUndefined() {
	return getContext(projectDataContextKey) as ProjectDataContext | undefined;
}
