import type { GraphData } from '$lib/data/GraphData';
import { ById } from '$lib/editor/ById';
import { addFallbackNodes } from './addFallbackNodes';

function cloneGraphData(graphData: GraphData): GraphData {
	return {
		nodes: ById.fromItems(graphData.nodes.values()),
		groups: ById.fromItems(graphData.groups.values()),
		connections: ById.fromItems(graphData.connections.values()),
	};
}

export function getProcessedGraphData(graphData: GraphData) {
	const graphDataClone = cloneGraphData(graphData);
	addFallbackNodes(graphDataClone);
	return graphDataClone;
}
