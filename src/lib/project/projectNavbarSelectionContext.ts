import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type ProjectNavbarSelectionContext = {
	projectNavbarSelection: string;
};

export const projectNavbarSelectionContextKey = Symbol('projectNavbarSelectionContextKey');

export function setProjectNavbarSelectionContext(
	projectNavbarSelectionContext: ProjectNavbarSelectionContext,
) {
	setContext(projectNavbarSelectionContextKey, projectNavbarSelectionContext);
	updateContext(projectNavbarSelectionContextKey);
}
