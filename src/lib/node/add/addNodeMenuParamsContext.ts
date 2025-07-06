import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';
import type { AddNodeMenuParams } from './AddNodeMenuParams';

export type AddNodeMenuParamsContext = {
	addNodeMenuParams?: AddNodeMenuParams;
};

export const addNodeMenuParamsContextKey = Symbol('addNodeMenuParamsContextKey');

export function setAddNodeMenuParamsContext(addNodeMenuParamsContext: AddNodeMenuParamsContext) {
	setContext(addNodeMenuParamsContextKey, addNodeMenuParamsContext);
	updateContext(addNodeMenuParamsContextKey);
}
