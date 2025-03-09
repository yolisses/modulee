import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { EditorCommand } from '$lib/editor/EditorCommand';

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
