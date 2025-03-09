import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { getBaseNodeInputPaths } from './getBaseNodeInputPaths';
import { getGroupNodeInputPaths } from './getGroupNodeInputPaths';

// TODO consider adopting an OOP approach
export function getNodeInputPaths(nodeData: NodeData, graphRegistry: GraphRegistry) {
	if (nodeData.type === 'GroupNode' || nodeData.type === 'GroupVoicesNode') {
		return getGroupNodeInputPaths(nodeData, graphRegistry);
	} else {
		return getBaseNodeInputPaths(nodeData);
	}
}
