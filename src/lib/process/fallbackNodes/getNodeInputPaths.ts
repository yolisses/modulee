import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { getBaseNodeInputPaths } from './getBaseNodeInputPaths';
import { getGroupNodeInputPaths } from './getGroupNodeInputPaths';

// TODO consider adopting an OOP approach
export function getNodeInputPaths(nodeData: NodeData, graphData: GraphData) {
	if (nodeData.type === 'GroupNode' || nodeData.type === 'GroupVoicesNode') {
		return getGroupNodeInputPaths(nodeData, graphData);
	} else {
		return getBaseNodeInputPaths(nodeData);
	}
}
