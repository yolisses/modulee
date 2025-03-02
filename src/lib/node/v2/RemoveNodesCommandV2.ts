import type { NodeData } from '$lib/data/NodeData';
import { CommandWithUndo } from '$lib/shortcut/CommandWithUndo';
import type { Contexts } from '$lib/shortcut/contexts';

export class RemoveNodesCommandV2 extends CommandWithUndo {
	nodesData!: NodeData[];

	execute(contexts: Contexts): void {
		const { graphData } = contexts.graphDataContext;
		const { selectedNodeIds } = contexts.selectedNodeIdsContext;

		this.nodesData = graphData.nodes.removeByCondition((node) => {
			return selectedNodeIds.has(node.id);
		});
	}

	undo(contexts: Contexts): void {
		const { graphData } = contexts.graphDataContext;

		this.nodesData.forEach((nodeData) => {
			graphData.nodes.add(nodeData);
		});
	}
}
