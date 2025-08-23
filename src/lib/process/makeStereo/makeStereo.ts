import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

const STEREO_PREFIX = '/channel1';

// To make the graph stereo, the ideal solution from this end would be all nodes
// having two outputs, but that seems such a hard coded waste. Mono instruments
// or effects (without randomness) would be all calculating the same thing twice
// for no reason.
//
// That said, the nodes only will be duplicated if they have to. For simple
// graphs it means duplicating every node that differs from one channel to
// another (both random nodes and nodes that depend from random nodes). But for
// graphs with nested modules, it is required to use a "meta" node that will be
// equivalent to creating a second output for the module nodes. Only modules
// with stereo output will have this attached to.
//
// The rules
// - A node inherently stereo should be duplicated (e.g.: NoiseNode)
// - A node that depends on a inherently stereo node should be duplicated
// - Module nodes should not be duplicated
export function makeStereo(graphRegistry: GraphRegistry) {
	const idsMap: Record<string, string> = {};

	graphRegistry.nodes.values().forEach((nodeData) => {
		const newNodeData = structuredClone(nodeData);
		if (newNodeData.type === 'OutputNode') {
			newNodeData.extras.channel = 1;
		}

		// DEBUG
		// newNodeData.position.x += 10;
		newNodeData.position.y += 10;

		newNodeData.id += STEREO_PREFIX;
		graphRegistry.nodes.add(newNodeData);
		idsMap[nodeData.id] = newNodeData.id;
	});

	graphRegistry.connections.values().forEach((connectionData) => {
		const newConnectionData = structuredClone(connectionData);
		newConnectionData.id = createId();
		newConnectionData.targetNodeId += STEREO_PREFIX;
		newConnectionData.inputPath.nodeId += STEREO_PREFIX;
		graphRegistry.connections.add(newConnectionData);
	});
}
