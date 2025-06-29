import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { AUDIO_INPUT_KEY } from '$lib/input/AUDIO_INPUT_KEY';
import { getAreInputPathsEqual } from '$lib/input/getAreInputPathsEqual';

export function getModuleNodeAudioTargetNodeId(moduleNodeId: string, graphRegistry: GraphRegistry) {
	const connections = graphRegistry.connections.values().filter((connectionData) => {
		return getAreInputPathsEqual(connectionData.inputPath, {
			nodeId: moduleNodeId,
			inputKey: AUDIO_INPUT_KEY,
		});
	});

	if (connections.length > 1) {
		throw new Error('More than one audio connection', { cause: connections });
	}

	return connections.at(0)?.targetNodeId;
}
