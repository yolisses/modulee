import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { SomeModuleNodeData } from '$lib/rack/SomeModuleNodeData';
import { getAudioInputNodes } from './getAudioInputNodes';

function getAudioInputTargetNodeId(
	moduleNodeData: SomeModuleNodeData,
	graphRegistry: GraphRegistry,
) {
	const audioInputNodeData = getAudioInputNodes(moduleNodeData, graphRegistry);
	if (!audioInputNodeData) return;

	const connection = graphRegistry.connections.values().find((connectionData) => {
		const { inputKey, nodeId } = connectionData.inputPath;
		return inputKey === audioInputNodeData.id && nodeId === moduleNodeData.id;
	});
	if (!connection) return;

	return connection.targetNodeId;
}
