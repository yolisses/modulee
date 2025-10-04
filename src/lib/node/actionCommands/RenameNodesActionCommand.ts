import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import type { NodeData } from '../data/NodeData';
import { renameNodesStateContextKey } from '../RenameNodesStateContext';

export class RenameNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { modalState } = contexts.get(renameNodesStateContextKey);
		modalState.open();
	}
}
