import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';

export class AddNodeCommand extends EditorCommand<{
	node: NodeData;
}> {
	static name = 'AddNodeCommand';

	execute(graphData: GraphRegistry): void {
		const { node } = this.details;
		graphData.nodes.add(node);
	}

	undo(graphData: GraphRegistry): void {
		const { node } = this.details;
		graphData.nodes.remove(node);
	}
}
