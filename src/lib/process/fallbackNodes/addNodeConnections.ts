import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { createInputFallbackConnection } from './createInputFallbackConnection';
import { getIsInputConnected } from './getIsInputConnected';
import { getNodeInputPaths } from './getNodeInputPaths';

export function addFallbackNodeConnections(nodeData: NodeData, graphData: GraphData) {
	const inputPaths = getNodeInputPaths(nodeData, graphData);

	inputPaths.forEach((inputPath) => {
		const isInputConnected = getIsInputConnected(inputPath, graphData);
		if (isInputConnected) return;

		const inputFallbackConnection = createInputFallbackConnection(inputPath, nodeData);
		graphData.connections.add(inputFallbackConnection);
	});
}
