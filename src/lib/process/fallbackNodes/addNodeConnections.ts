import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { createInputFallbackConnection } from './createInputFallbackConnection';
import { getIsInputConnected } from './getIsInputConnected';
import { getNodeInputPaths } from './getNodeInputPaths';

// TODO consider adopting an OOP approach
export function addFallbackNodeConnections(nodeData: NodeData, graphRegistry: GraphRegistry) {
	const inputPaths = getNodeInputPaths(nodeData, graphRegistry);

	inputPaths.forEach((inputPath) => {
		const isInputConnected = getIsInputConnected(inputPath, graphRegistry);
		if (isInputConnected) return;

		const inputFallbackConnection = createInputFallbackConnection(inputPath, nodeData);
		graphRegistry.connections.add(inputFallbackConnection);
	});
}
