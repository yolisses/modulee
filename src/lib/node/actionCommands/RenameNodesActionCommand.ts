import { graphContextKey } from '$lib/graph/graphContext';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { selectedNodeIdsContextKey } from 'nodes-editor';
import type { NodeData } from '../data/NodeData';
import { renameNodesStateContextKey } from '../RenameNodesStateContext';

export class RenameNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { graph } = contexts.get(graphContextKey);
		const { selectedNodeIds } = contexts.get(selectedNodeIdsContextKey);
		const renameNodesStateContext = contexts.get(renameNodesStateContextKey);
		if (selectedNodeIds.size === 0) return;
		renameNodesStateContext.nodes = graph.nodes
			.values()
			.filter((node) => selectedNodeIds.has(node.id));
	}
}
