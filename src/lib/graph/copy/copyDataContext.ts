import type { CopyData } from '$lib/graph/copy/CopyData';
import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type CopyDataContext = {
	offset: number;
	copyData?: CopyData;
};

export const copyDataContextKey = Symbol('copyDataContextKey');

export function setCopyDataContext(copyDataContext: CopyDataContext) {
	setContext(copyDataContextKey, copyDataContext);
	updateContext(copyDataContextKey);
}
