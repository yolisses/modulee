import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type InternalModuleIdContext = {
	internalModuleId: string;
};

const internalModuleIdContextKey = Symbol('internalModuleIdContextKey');

export function setInternalModuleIdContext(internalModuleIdContext: InternalModuleIdContext) {
	setContext(internalModuleIdContextKey, internalModuleIdContext);
}

export function getInternalModuleIdContext() {
	return getContextOrThrow<InternalModuleIdContext>(internalModuleIdContextKey);
}
