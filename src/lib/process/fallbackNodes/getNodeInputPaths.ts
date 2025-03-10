import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { getBaseNodeInputPaths } from './getBaseNodeInputPaths';
import { getModuleNodeInputPaths } from './getInternalModuleNodeInputPaths';

// TODO consider adopting an OOP approach
export function getNodeInputPaths(nodeData: NodeData, graphRegistry: GraphRegistry) {
	if (nodeData.type === 'ModuleNode' || nodeData.type === 'ModuleVoicesNode') {
		return getModuleNodeInputPaths(nodeData, graphRegistry);
	} else {
		return getBaseNodeInputPaths(nodeData);
	}
}
