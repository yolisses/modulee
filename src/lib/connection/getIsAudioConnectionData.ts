import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { AUDIO_INPUT_KEY } from '$lib/input/AUDIO_INPUT_KEY';
import { getIsOutputNodeData } from '$lib/rack/getIsOutputNodeData';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';

export function getIsAudioConnectionData(
	connectionData: ConnectionData,
	graphRegistry: GraphRegistry,
) {
	const originNode = graphRegistry.nodes.getOrNull(connectionData.inputPath.nodeId);
	if (!originNode) return false;

	const { inputKey } = connectionData.inputPath;
	return (
		(inputKey === AUDIO_INPUT_KEY && getIsSomeModuleNodeData(originNode)) ||
		(inputKey === 'input' && getIsOutputNodeData(originNode))
	);
}
