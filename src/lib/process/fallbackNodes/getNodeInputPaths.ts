import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { getBaseNodeInputPaths } from './getBaseNodeInputPaths';
import { getInternalModuleNodeInputPaths } from './getInternalModuleNodeInputPaths';

// TODO consider adopting an OOP approach
export function getNodeInputPaths(nodeData: NodeData, graphRegistry: GraphRegistry) {
	if (nodeData.type === 'InternalModuleNode' || nodeData.type === 'InternalModuleVoicesNode') {
		return getInternalModuleNodeInputPaths(nodeData, graphRegistry);
	} else {
		return getBaseNodeInputPaths(nodeData);
	}
}
