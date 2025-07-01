import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { AUDIO_INPUT_KEY } from '$lib/input/AUDIO_INPUT_KEY';

export function getIsAudioConnectionData(
	connectionData: ConnectionData,
	graphRegistry: GraphRegistry,
) {
	return (
		connectionData.inputPath.inputKey === AUDIO_INPUT_KEY &&
		graphRegistry.nodes.getOrNull(connectionData.targetNodeId)?.type === 'ModuleNode' &&
		graphRegistry.nodes.getOrNull(connectionData.inputPath.nodeId)?.type === 'ModuleNode'
	);
}
