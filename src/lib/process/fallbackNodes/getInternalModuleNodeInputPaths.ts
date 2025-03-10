import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputPath } from '$lib/data/InputPath';
import type { InternalModuleNodeData } from '$lib/data/variants/InternalModuleNodeData';
import type { InternalModuleVoicesNodeData } from '$lib/data/variants/InternalModuleVoicesNodeData';

// TODO consider adopting an OOP approach
export function getInternalModuleNodeInputPaths(
	internalModuleNodeData: InternalModuleNodeData | InternalModuleVoicesNodeData,
	graphRegistry: GraphRegistry,
) {
	const inputPaths: InputPath[] = [];
	const { targetInternalModuleId } = internalModuleNodeData.extras;
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.type !== 'InputNode') return;
		if (nodeData.internalModuleId !== targetInternalModuleId) return;
		inputPaths.push({
			inputKey: nodeData.id,
			nodeId: internalModuleNodeData.id,
		});
	});
	return inputPaths;
}
