import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { InputNodeData } from '$lib/data/variants/InputNodeData';

export function replaceAudioInputNodes(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.type === 'AudioInputNode') {
			const inputNodeData: InputNodeData = {
				...nodeData,
				type: 'InputNode',
				extras: {
					max: 1,
					min: -1,
					default: 0,
					name: 'audio',
				},
			};
			graphRegistry.nodes.set(inputNodeData);
		}
	});
}
