import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type SelectedTabContext = {
	selectedTab?: string;
};

const selectedTabContextKey = Symbol('selectedTabContextKey');

export function setSelectedTabContext(selectedTabContext: SelectedTabContext) {
	setContext(selectedTabContextKey, selectedTabContext);
}

export function getSelectedTabContext() {
	return getContextOrThrow<SelectedTabContext>(selectedTabContextKey);
}
