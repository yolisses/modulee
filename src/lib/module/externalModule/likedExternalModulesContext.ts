import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type LikedExternalModulesContext = {
	likedExternalModules: Set<string>;
};

export const likedExternalModulesContextKey = Symbol('likedExternalModulesContextKey');

export function setLikedExternalModulesContext(
	likedExternalModulesContext: LikedExternalModulesContext,
) {
	setContext(likedExternalModulesContextKey, likedExternalModulesContext);
	updateContext(likedExternalModulesContextKey);
}
