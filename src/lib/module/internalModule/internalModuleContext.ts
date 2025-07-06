import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';
import type { InternalModule } from './InternalModule';

export type InternalModuleContext = {
	internalModule: InternalModule;
};

export const internalModuleContextKey = Symbol('internalModuleContextKey');

export function setInternalModuleContext(internalModuleContext: InternalModuleContext) {
	setContext(internalModuleContextKey, internalModuleContext);
	updateContext(internalModuleContextKey);
}
