import type { Input } from '$lib/input/Input';
import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';

export type AddNodeInputContext = {
	addNodeInput: Input;
};

export const addNodeInputContextKey = Symbol('addNodeInputContextKey');

export function setAddNodeInputContext(addNodeInputContext: AddNodeInputContext) {
	setContext(addNodeInputContextKey, addNodeInputContext);
	updateContext(addNodeInputContextKey);
}
