import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { createInputFallbackConnection } from './createInputFallbackConnection';
import { getIsInputConnected } from './getIsInputConnected';
import { getNodeInputPaths } from './getNodeInputPaths';

// TODO consider adopting an OOP approach
export function addFallbackNodeConnections(nodeData: NodeData, graphData: GraphRegistry) {
	const inputPaths = getNodeInputPaths(nodeData, graphData);

	inputPaths.forEach((inputPath) => {
		const isInputConnected = getIsInputConnected(inputPath, graphData);
		if (isInputConnected) return;

		const inputFallbackConnection = createInputFallbackConnection(inputPath, nodeData);
		graphData.connections.add(inputFallbackConnection);
	});
}
