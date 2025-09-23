import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';

export class AddNodeCommand extends EditorCommand<{
	node: NodeData;
}> {
	static name = 'AddNodeCommand';

	execute(graphRegistry: GraphRegistry): void {
		const { node } = this.details;
		graphRegistry.nodes.add(node);
	}

	undo(graphRegistry: GraphRegistry): void {
		const { node } = this.details;
		graphRegistry.nodes.remove(node);
	}
}
