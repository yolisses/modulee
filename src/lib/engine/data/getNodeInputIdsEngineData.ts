import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { hashToUsize } from './hashToUsize';

export function getNodeInputIdsEngineData(nodeData: NodeData, graphData: GraphData) {
	const inputIds: Record<string, number> = {};
	graphData.connections.values().forEach((connectionData) => {
		if (connectionData.inputPath.nodeId !== nodeData.id) {
			return;
		}
		const { inputName } = connectionData.inputPath;
		const outputId = connectionData.targetNodeId;
		inputIds[inputName] = hashToUsize(outputId);
	});
	return inputIds;
}
