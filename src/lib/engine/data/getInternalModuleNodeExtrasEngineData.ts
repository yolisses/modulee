import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ModuleNodeData } from '$lib/data/variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from '$lib/data/variants/ModuleVoicesNodeData';
import { hashToUsize } from './hashToUsize';

export function getModuleNodeExtrasEngineData(
	moduleNodeData: ModuleNodeData | ModuleVoicesNodeData,
	graphRegistry: GraphRegistry,
) {
	const inputTargetIds = new Map();

	graphRegistry.connections.values().forEach((connectionData) => {
		const { inputPath } = connectionData;
		if (inputPath.nodeId !== moduleNodeData.id) {
			return;
		}

		const inputIdHash = hashToUsize(inputPath.inputKey);
		const targetNodeIdHash = hashToUsize(connectionData.targetNodeId);
		inputTargetIds.set(inputIdHash, targetNodeIdHash);
	});

	const targetInternalModuleId = moduleNodeData.extras.moduleReference
		? hashToUsize(moduleNodeData.extras.moduleReference.moduleId as string)
		: undefined;

	return {
		target_module_id: targetInternalModuleId,
		input_target_ids: Object.fromEntries(inputTargetIds.entries()),
	};
}
