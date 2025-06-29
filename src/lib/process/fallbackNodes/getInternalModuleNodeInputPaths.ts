import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';
import type { ModuleNodeData } from '$lib/node/data/variants/ModuleNodeData';
import type { ModuleVoicesNodeData } from '$lib/node/data/variants/ModuleVoicesNodeData';

// TODO consider adopting an OOP approach
export function getModuleNodeInputPaths(
	moduleNodeData: ModuleNodeData | ModuleVoicesNodeData,
	graphRegistry: GraphRegistry,
) {
	const inputPaths: InputPath[] = [];
	const { moduleReference } = moduleNodeData.extras;
	if (!moduleReference) return inputPaths;

	// TODO handle ExternalModuleReference

	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.type !== 'InputNode') return;
		if (nodeData.internalModuleId !== moduleReference.moduleId) return;
		inputPaths.push({
			inputKey: nodeData.id,
			nodeId: moduleNodeData.id,
		});
	});
	return inputPaths;
}
