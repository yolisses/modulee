import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type UseInNodeIdContext = {
	useInNodeId?: string;
};

const useInNodeIdContextKey = Symbol('useInNodeIdContextKey');

export function setUseInNodeIdContext(useInNodeIdContext: UseInNodeIdContext) {
	setContext(useInNodeIdContextKey, useInNodeIdContext);
}

export function getUseInNodeIdContext() {
	return getContextOrThrow<UseInNodeIdContext>(useInNodeIdContextKey);
}
