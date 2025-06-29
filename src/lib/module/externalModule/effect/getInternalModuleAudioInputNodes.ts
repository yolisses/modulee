import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { getIsAudioInputNodeData } from '$lib/module/externalModule/effect/getIsAudioInputNodeData';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';

export function getInternalModuleAudioInputNodes(
	internalModuleData: InternalModuleData,
	graphRegistry: GraphRegistry,
) {
	return graphRegistry.nodes
		.values()
		.filter(getIsAudioInputNodeData)
		.filter((nodeData) => {
			return nodeData.internalModuleId === internalModuleData.id;
		});
}
