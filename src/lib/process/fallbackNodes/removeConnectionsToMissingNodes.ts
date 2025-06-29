import type { GraphRegistry } from '$lib/graph/GraphRegistry';

/**
 * Removes the connections to nodes that are not present, e.g.: deleted nodes.
 */
export function removeConnectionsToMissingNodes(graphRegistry: GraphRegistry) {
	const { nodes } = graphRegistry;
	graphRegistry.connections.values().forEach((connectionData) => {
		const { targetNodeId } = connectionData;
		if (!nodes.containsId(targetNodeId)) {
			graphRegistry.connections.remove(connectionData);
		}
	});
}
