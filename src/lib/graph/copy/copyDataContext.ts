import type { CopyData } from '$lib/graph/copy/CopyData';
import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type CopyDataContext = {
	offset: number;
	copyData?: CopyData;
};

export const copyDataContextKey = Symbol('copyDataContextKey');

export function setCopyDataContext(copyDataContext: CopyDataContext) {
	setContext(copyDataContextKey, copyDataContext);
}

export function getRequiredContext(copyDataContextKey) {
	return getContextOrThrow<CopyDataContext>(copyDataContextKey);
}
