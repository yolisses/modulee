import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';
import type { Space } from './Space';

export type SpaceContext = {
	space: Space;
};

const spaceContextKey = Symbol('spaceContextKey');

export function setSpaceContext(spaceContext: SpaceContext) {
	setContext(spaceContextKey, spaceContext);
}

export function getSpaceContext() {
	return getContextOrThrow<SpaceContext>(spaceContextKey);
}
