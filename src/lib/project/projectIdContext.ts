import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type ProjectIdContext = {
	projectId: string;
};

const projectIdContextKey = Symbol('projectIdContextKey');

export function setProjectIdContext(projectIdContext: ProjectIdContext) {
	setContext(projectIdContextKey, projectIdContext);
}

export function getProjectIdContext() {
	return getContextOrThrow<ProjectIdContext>(projectIdContextKey);
}
