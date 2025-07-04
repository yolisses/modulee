import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type ProjectToolbarContext = {
	projectToolbar: HTMLElement;
};

export const projectToolbarContextKey = Symbol('projectToolbarContextKey');

export function setProjectToolbarContext(projectToolbarContext: ProjectToolbarContext) {
	setContext(projectToolbarContextKey, projectToolbarContext);
	updateContext(projectToolbarContextKey);
}
