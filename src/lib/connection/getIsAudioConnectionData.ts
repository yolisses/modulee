import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { AUDIO_INPUT_KEY } from '$lib/input/AUDIO_INPUT_KEY';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';

export function getIsAudioConnectionData(
	connectionData: ConnectionData,
	graphRegistry: GraphRegistry,
) {
	const targetNode = graphRegistry.nodes.getOrNull(connectionData.targetNodeId);
	const originNode = graphRegistry.nodes.getOrNull(connectionData.inputPath.nodeId);
	return (
		connectionData.inputPath.inputKey === AUDIO_INPUT_KEY &&
		targetNode &&
		getIsSomeModuleNodeData(targetNode) &&
		originNode &&
		getIsSomeModuleNodeData(originNode)
	);
}
