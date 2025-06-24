import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InternalModuleData } from '$lib/data/InternalModuleData';
import { getIsAudioInputNodeData } from '$lib/module/externalModule/effect/getIsAudioInputNodeData';

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
