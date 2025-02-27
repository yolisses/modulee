import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { Command } from '$lib/editor/Command';

export class RemoveNodeCommand extends Command<{
	nodeId: string;
}> {
	static name = 'RemoveNodeCommand';

	nodeData!: NodeData;

	execute(graphData: GraphData): void {
		this.nodeData = graphData.nodes.removeById(this.details.nodeId);
	}

	undo(graphData: GraphData): void {
		graphData.nodes.add(this.nodeData);
	}
}
