import type { GraphData } from '$lib/data/GraphData';
import type { GroupNodeData } from '$lib/data/variants/GroupNodeData';
import type { GroupVoicesNodeData } from '$lib/data/variants/GroupVoicesNodeData';
import { hashToUsize } from './hashToUsize';

export function getGroupNodeExtrasEngineData(
	groupNodeData: GroupNodeData | GroupVoicesNodeData,
	graphData: GraphData,
) {
	const inputTargetIds = new Map();

	graphData.connections.values().forEach((connectionData) => {
		const { inputPath } = connectionData;
		if (inputPath.nodeId !== groupNodeData.id) {
			return;
		}

		const inputIdHash = hashToUsize(inputPath.inputKey);
		const targetNodeIdHash = hashToUsize(connectionData.targetNodeId);
		inputTargetIds.set(inputIdHash, targetNodeIdHash);
	});

	const targetGroupId = groupNodeData.extras.targetGroupId
		? hashToUsize(groupNodeData.extras.targetGroupId as string)
		: undefined;

	return {
		target_group_id: targetGroupId,
		input_target_ids: Object.fromEntries(inputTargetIds.entries()),
	};
}
