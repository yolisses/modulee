import { updateContext } from '$lib/shortcut/contextsContext';
import type { ModalState } from '$lib/ui/ModalState.svelte';
import { setContext } from 'svelte';

export type RenameNodesStateContext = {
	modalState: ModalState;
};

export const renameNodesStateContextKey = Symbol('renameNodesStateContextKey');

export function setRenameNodesStateContext(renameNodesStateContext: RenameNodesStateContext) {
	setContext(renameNodesStateContextKey, renameNodesStateContext);
	updateContext(renameNodesStateContextKey);
}
