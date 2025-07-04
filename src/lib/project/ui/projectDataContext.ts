import { updateContext } from '$lib/shortcut/contextsContext';
import { getContext, setContext } from 'svelte';
import type { ProjectData } from '../data/ProjectData';

export type ProjectDataContext = {
	projectData: ProjectData;
};

export const projectDataContextKey = Symbol('projectDataContextKey');

export function setProjectDataContext(projectDataContext: ProjectDataContext) {
	setContext(projectDataContextKey, projectDataContext);
	updateContext(projectDataContextKey);
}

export function getProjectDataContextOrUndefined() {
	return getContext(projectDataContextKey) as ProjectDataContext | undefined;
}
