import type { NodeData } from '$lib/data/NodeData';
import type { GraphDataContext } from '$lib/graph/graphDataContext';
import { Command } from '$lib/shortcut/Command';

export class RemoveNodeCommandV2 extends Command<
	{ graphDataContext: GraphDataContext },
	{ nodeId: string }
> {
	nodeData!: NodeData;

	execute(): void {
		const { graphData } = this.contexts.graphDataContext;
		this.nodeData = graphData.nodes.removeById(this.params.nodeId);
	}

	undo(): void {
		const { graphData } = this.contexts.graphDataContext;
		graphData.nodes.add(this.nodeData);
	}
}
