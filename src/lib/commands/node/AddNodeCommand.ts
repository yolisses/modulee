import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { Command } from '$lib/editor/Command';

export class AddNodeCommand extends Command<{
	node: NodeData;
}> {
	execute(graphData: GraphData): void {
		const { node } = this.details;
		graphData.nodes.add(node);
	}

	undo(graphData: GraphData): void {
		const { node } = this.details;
		graphData.nodes.remove(node);
	}
}
