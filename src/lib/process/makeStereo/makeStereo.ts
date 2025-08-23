import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

const STEREO_PREFIX = '/channel1';

export function makeStereo(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		const newNodeData = structuredClone(nodeData);
		if (newNodeData.type === 'OutputNode') {
			newNodeData.extras.channel = 1;
		}
		newNodeData.id += STEREO_PREFIX;
		graphRegistry.nodes.add(newNodeData);
	});
	graphRegistry.connections.values().forEach((connectionData) => {
		const newConnectionData = structuredClone(connectionData);
		newConnectionData.id = createId();
		newConnectionData.targetNodeId += STEREO_PREFIX;
		newConnectionData.inputPath.nodeId += STEREO_PREFIX;
		graphRegistry.connections.add(newConnectionData);
	});
}
