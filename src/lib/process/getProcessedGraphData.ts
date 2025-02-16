import type { GraphData } from '$lib/data/GraphData';
import { ById } from '$lib/editor/ById';
import { addFallbackNodes } from './addFallbackNodes';

function cloneGraphData(graphData: GraphData): GraphData {
	return {
		nodes: new ById(graphData.nodes.values()),
		groups: new ById(graphData.groups.values()),
		connections: new ById(graphData.connections.values()),
	};
}

export function getProcessedGraphData(graphData: GraphData) {
	const graphDataClone = cloneGraphData(graphData);
	addFallbackNodes(graphDataClone);
	return graphDataClone;
}
