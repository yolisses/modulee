import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type InternalModuleIdContext = {
	internalModuleId: string;
};

export const internalModuleIdContextKey = Symbol('internalModuleIdContextKey');

export function setInternalModuleIdContext(internalModuleIdContext: InternalModuleIdContext) {
	setContext(internalModuleIdContextKey, internalModuleIdContext);
	updateContext(internalModuleIdContextKey);
}
