import type { ConnectionData } from '$lib/connection/ConnectionData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';

/**
 * Requires new node and connection data, with new IDs already set.
 */
export class PasteNodesCommand extends EditorCommand<{
	nodes: NodeData[];
	connections: ConnectionData[];
}> {
	static name = 'PasteNodesCommand';

	execute(graphRegistry: GraphRegistry): void {
		const { nodes, connections } = this.details;
		graphRegistry.nodes.addMany(nodes);
		graphRegistry.connections.addMany(connections);
	}

	undo(graphRegistry: GraphRegistry): void {
		const { nodes, connections } = this.details;
		graphRegistry.nodes.removeMany(nodes);
		graphRegistry.connections.removeMany(connections);
	}
}
