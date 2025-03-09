import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type IsSidebarVisibleContext = {
	isSidebarVisible?: boolean;
};

const isSidebarVisibleContextKey = Symbol('isSidebarVisibleContextKey');

export function setIsSidebarVisibleContext(isSidebarVisibleContext: IsSidebarVisibleContext) {
	setContext(isSidebarVisibleContextKey, isSidebarVisibleContext);
}

export function getIsSidebarVisibleContext() {
	return getContextOrThrow<IsSidebarVisibleContext>(isSidebarVisibleContextKey);
}
