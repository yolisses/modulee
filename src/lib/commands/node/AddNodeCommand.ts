import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class AddNodeCommand extends EditorCommand<{
	node: NodeData;
}> {
	static name = 'AddNodeCommand';

	execute(graphData: GraphData): void {
		const { node } = this.details;
		graphData.nodes.add(node);
	}

	undo(graphData: GraphData): void {
		const { node } = this.details;
		graphData.nodes.remove(node);
	}
}
