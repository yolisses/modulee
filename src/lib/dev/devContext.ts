import { getContext, setContext } from 'svelte';

export type DevContext = {
	dev: number;
};

export const devContextKey = Symbol('devContextKey');

export function setDevContext(devContext: DevContext) {
	setContext(devContextKey, devContext);
}

export function getDevContextOrUndefined() {
	return getContext(devContextKey) as DevContext | undefined;
}
