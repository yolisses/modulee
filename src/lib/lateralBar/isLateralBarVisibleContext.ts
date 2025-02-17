import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type IsLateralBarVisibleContext = {
	isLateralBarVisible?: boolean;
};

const isLateralBarVisibleContextKey = Symbol('isLateralBarVisibleContextKey');

export function setIsLateralBarVisibleContext(
	isLateralBarVisibleContext: IsLateralBarVisibleContext,
) {
	setContext(isLateralBarVisibleContextKey, isLateralBarVisibleContext);
}

export function getIsLateralBarVisibleContext() {
	return getContextOrThrow<IsLateralBarVisibleContext>(isLateralBarVisibleContextKey);
}
