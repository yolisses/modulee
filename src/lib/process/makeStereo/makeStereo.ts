import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export function makeStereo(graphRegistry: GraphRegistry) {
	const newNodeIds = new Map<string, string>();
	graphRegistry.nodes.values().forEach((nodeData) => {
		const newNodeData = structuredClone(nodeData);
		const newNodeId = createId();
		newNodeIds.set(newNodeId, newNodeData.id);
		newNodeData.id = newNodeId;
		graphRegistry.nodes.add(newNodeData);
	});
	graphRegistry.connections.values().forEach((connectionData) => {
		const newConnectionData = structuredClone(connectionData);
		newConnectionData.id = createId();
		connectionData.targetNodeId = newNodeIds.get(connectionData.targetNodeId)!;
		connectionData.inputPath.nodeId = newNodeIds.get(connectionData.inputPath.nodeId)!;
	});
}
