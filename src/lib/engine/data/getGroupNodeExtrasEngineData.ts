import { getInputPathId } from '$lib/connection/getInputPathId';
import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { hashToUsize } from './hashToUsize';

export function getGroupNodeExtrasEngineData(nodeData: NodeData, graphData: GraphData) {
	const inputTargetIds = new Map();

	graphData.connections.values().forEach((connectionData) => {
		const { inputPath } = connectionData;
		if (inputPath.nodeId !== nodeData.id) {
			return;
		}

		const inputId = getInputPathId(inputPath);
		const inputIdHash = hashToUsize(inputId);
		const targetNodeIdHash = hashToUsize(connectionData.targetNodeId);
		inputTargetIds.set(inputIdHash, targetNodeIdHash);
	});

	const targetGroupId = nodeData.extras.targetGroupId
		? hashToUsize(nodeData.extras.targetGroupId as string)
		: undefined;

	return {
		target_group_id: targetGroupId,
		input_target_ids: inputTargetIds,
	};
}
