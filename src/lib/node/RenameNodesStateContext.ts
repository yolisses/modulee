import { updateContext } from '$lib/shortcut/contextsContext';
import { setContext } from 'svelte';
import type { Node } from './Node.svelte';

export type RenameNodesStateContext = {
	nodes: Node[];
};

export const renameNodesStateContextKey = Symbol('renameNodesStateContextKey');

export function setRenameNodesStateContext(renameNodesStateContext: RenameNodesStateContext) {
	setContext(renameNodesStateContextKey, renameNodesStateContext);
	updateContext(renameNodesStateContextKey);
}
