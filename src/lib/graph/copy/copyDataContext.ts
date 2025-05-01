import type { CopyData } from '$lib/graph/copy/CopyData';
import { getContextOrThrow } from '$lib/ui/getContextOrThrow';
import { setContext } from 'svelte';

export type CopyDataContext = {
	offset: number;
	copyData?: CopyData;
};

const copyDataContextKey = Symbol('copyDataContextKey');

export function setCopyDataContext(copyDataContext: CopyDataContext) {
	setContext(copyDataContextKey, copyDataContext);
}

export function getCopyDataContext() {
	return getContextOrThrow<CopyDataContext>(copyDataContextKey);
}
