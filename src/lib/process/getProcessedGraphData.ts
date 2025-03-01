import type { GraphData } from '$lib/data/GraphData';
import { addFallbackNodes } from './fallbackNodes/addFallbackNodes';
import { addImplicitNodes } from './implicitNodes/addImplicitNodes';

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
	addImplicitNodes(graphDataClone);
	addFallbackNodes(graphDataClone);
	return graphDataClone;
}
