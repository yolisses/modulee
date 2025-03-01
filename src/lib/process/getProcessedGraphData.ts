import type { GraphData } from '$lib/data/GraphData';
import { addFallbackNodes } from './fallbackNodes/addFallbackNodes';

function cloneGraphData(graphData: GraphData): GraphData {
	return {
		mainGroupId: graphData.mainGroupId,
		nodes: graphData.nodes.clone(),
		groups: graphData.groups.clone(),
		connections: graphData.connections.clone(),
	};
}

export function getProcessedGraphData(graphData: GraphData) {
	const graphDataClone = cloneGraphData(graphData);
	addFallbackNodes(graphDataClone);
	return graphDataClone;
}
