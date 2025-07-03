import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type ProjectNavbarSelectionContext = {
	projectNavbarSelection: string;
};

export const projectNavbarSelectionContextKey = Symbol('projectNavbarSelectionContextKey');

export function setProjectNavbarSelectionContext(
	projectNavbarSelectionContext: ProjectNavbarSelectionContext,
) {
	setContext(projectNavbarSelectionContextKey, projectNavbarSelectionContext);
}

export function getProjectNavbarSelectionContext() {
	return getContextOrThrow<ProjectNavbarSelectionContext>(projectNavbarSelectionContextKey);
}
