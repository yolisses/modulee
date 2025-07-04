import { updateContext } from '$lib/shortcut/contextsContext';
import { getContext, setContext } from 'svelte';

export type UseExternalModuleInContext = {
	useExternalModuleIn?:
		| { type: 'rack'; internalModuleId: string }
		| { type: 'moduleNode'; moduleNodeId: string };
};

export const useExternalModuleInContextKey = Symbol('useExternalModuleInContextKey');

export function setUseExternalModuleInContext(
	useExternalModuleInContext: UseExternalModuleInContext,
) {
	setContext(useExternalModuleInContextKey, useExternalModuleInContext);
	updateContext(useExternalModuleInContextKey);
}

export function getUseExternalModuleInContextOrUndefined(): UseExternalModuleInContext | undefined {
	return getContext<UseExternalModuleInContext>(useExternalModuleInContextKey);
}
