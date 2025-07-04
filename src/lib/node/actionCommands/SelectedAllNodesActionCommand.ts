import { graphContextKey } from '$lib/graph/graphContext';
import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
import type { NodeData } from '$lib/node/data/NodeData';
import { ActionCommand } from '$lib/shortcut/ActionCommand';
import type { Contexts } from '$lib/shortcut/Contexts.svelte';
import { selectedNodeIdsContextKey } from 'nodes-editor';

export class SelectedAllNodesActionCommand extends ActionCommand {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { graph } = contexts.get(graphContextKey);
		const { selectedNodeIds } = contexts.get(selectedNodeIdsContextKey);
		const { internalModuleId } = contexts.get(internalModuleIdContextKey);

		selectedNodeIds.clear();
		// TODO consider creating a context for visible nodes
		graph.nodes.values().forEach((nodeData) => {
			if (nodeData.internalModuleId === internalModuleId) {
				selectedNodeIds.add(nodeData.id);
			}
		});
	}
}
