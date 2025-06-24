import { getIsAudioInputNodeData } from '$lib/module/externalModule/effect/getIsAudioInputNodeData';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';

export function getExternalModuleAudioInputNodes(externalModuleData: ExternalModuleData) {
	const { graph } = externalModuleData;
	return graph.nodes.filter(getIsAudioInputNodeData).filter((nodeData) => {
		return nodeData.internalModuleId === graph.mainInternalModuleId;
	});
}
