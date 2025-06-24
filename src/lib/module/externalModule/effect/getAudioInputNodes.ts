import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { AudioInputNodeData } from '$lib/data/variants/AudioInputNodeData';
import { getIsAudioInputNodeData } from '$lib/module/externalModule/effect/getIsAudioInputNodeData';
import type { SomeModuleNodeData } from '$lib/rack/SomeModuleNodeData';
import { getExternalModuleAudioInputNodes } from './getExternalModuleAudioInputNodes';
import { getInternalModuleAudioInputNodes } from './getInternalModuleAudioInputNodes';

export function getAudioInputNodes(
	moduleNodeData: SomeModuleNodeData,
	graphRegistry: GraphRegistry,
) {
	const { moduleReference } = moduleNodeData.extras;
	if (!moduleReference) return;

	let audioInputNodes: AudioInputNodeData[];
	if (moduleReference.type === 'internal') {
		const internalModuleData = graphRegistry.internalModules.get(moduleReference.id);
		audioInputNodes = getInternalModuleAudioInputNodes(internalModuleData, graphRegistry);
	} else {
		const externalModuleData = graphRegistry.externalModules.get(moduleReference.id);
		audioInputNodes = getExternalModuleAudioInputNodes(externalModuleData);
	}

	const externalModuleData = graphRegistry.externalModules.get(moduleReference.id);
	const audioInputNodeData = externalModuleData.graph.nodes.find(getIsAudioInputNodeData);
	return audioInputNodeData;
}
