import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { AUDIO_INPUT_KEY } from '$lib/input/AUDIO_INPUT_KEY';
import { getIsAudioInputNodeData } from '$lib/rack/getIsAudioInputNodeData';
import { getIsInputNodeData } from '$lib/rack/getIsInputNodeData';
import { getId } from '$lib/ui/getId';

export function getInternalModuleInputKeys(internalModuleId: string, graphRegistry: GraphRegistry) {
	const internalModuleNodes = graphRegistry.nodes.values().filter((nodeData) => {
		return nodeData.internalModuleId === internalModuleId;
	});
	const keys = internalModuleNodes.filter(getIsInputNodeData).map(getId);
	if (internalModuleNodes.some(getIsAudioInputNodeData)) {
		keys.push(AUDIO_INPUT_KEY);
	}
	return keys;
}
