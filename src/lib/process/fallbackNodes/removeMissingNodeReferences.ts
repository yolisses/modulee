import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function removeMissingNodeReferences(graphRegistry: GraphRegistry) {
	const { nodes } = graphRegistry;
	graphRegistry.connections.values().forEach((connectionData) => {
		const { targetNodeId } = connectionData;
		if (!nodes.containsId(targetNodeId)) {
			graphRegistry.connections.remove(connectionData);
		}
	});
}
