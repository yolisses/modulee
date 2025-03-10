import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { hashToUsize } from './hashToUsize';

export function getNodeInputIdsEngineData(nodeData: NodeData, graphRegistry: GraphRegistry) {
	const inputIds: Record<string, number> = {};

	if (nodeData.type === 'InternalModuleNode' || nodeData.type === 'InternalModuleVoicesNode') {
		return inputIds;
	}

	graphRegistry.connections.values().forEach((connectionData) => {
		if (connectionData.inputPath.nodeId !== nodeData.id) {
			return;
		}
		const { inputKey } = connectionData.inputPath;
		const outputId = connectionData.targetNodeId;
		inputIds[inputKey] = hashToUsize(outputId);
	});
	return inputIds;
}
