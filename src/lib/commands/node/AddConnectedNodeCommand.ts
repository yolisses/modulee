import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';
import type { NodeData } from '$lib/node/data/NodeData';

export class AddConnectedNodeCommand extends EditorCommand<{
	node: NodeData;
	inputPath: InputPath;
	connectionId: string;
}> {
	static name = 'AddConnectedNodeCommand';

	execute(graphRegistry: GraphRegistry): void {
		const { node, inputPath, connectionId } = this.details;
		graphRegistry.nodes.add(node);
		graphRegistry.connections.add({ inputPath, id: connectionId, targetNodeId: node.id });
	}

	undo(graphRegistry: GraphRegistry): void {
		const { node, connectionId } = this.details;
		graphRegistry.nodes.remove(node);
		graphRegistry.connections.removeById(connectionId);
	}
}
