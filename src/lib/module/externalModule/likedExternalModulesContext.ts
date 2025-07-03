import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type LikedExternalModulesContext = {
	likedExternalModules: Set<string>;
};

export const likedExternalModulesContextKey = Symbol('likedExternalModulesContextKey');

export function setLikedExternalModulesContext(
	likedExternalModulesContext: LikedExternalModulesContext,
) {
	setContext(likedExternalModulesContextKey, likedExternalModulesContext);
}

export function getRequiredContext(likedExternalModulesContextKey) {
	return getContextOrThrow<LikedExternalModulesContext>(likedExternalModulesContextKey);
}
