import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleNodeData } from '$lib/data/variants/InternalModuleNodeData';
import type { InternalModuleVoicesNodeData } from '$lib/data/variants/InternalModuleVoicesNodeData';
import { hashToUsize } from './hashToUsize';

export function getInternalModuleNodeExtrasEngineData(
	internalModuleNodeData: InternalModuleNodeData | InternalModuleVoicesNodeData,
	graphRegistry: GraphRegistry,
) {
	const inputTargetIds = new Map();

	graphRegistry.connections.values().forEach((connectionData) => {
		const { inputPath } = connectionData;
		if (inputPath.nodeId !== internalModuleNodeData.id) {
			return;
		}

		const inputIdHash = hashToUsize(inputPath.inputKey);
		const targetNodeIdHash = hashToUsize(connectionData.targetNodeId);
		inputTargetIds.set(inputIdHash, targetNodeIdHash);
	});

	const targetInternalModuleId = internalModuleNodeData.extras.targetInternalModuleId
		? hashToUsize(internalModuleNodeData.extras.targetInternalModuleId as string)
		: undefined;

	return {
		target_internalModule_id: targetInternalModuleId,
		input_target_ids: Object.fromEntries(inputTargetIds.entries()),
	};
}
