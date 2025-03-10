import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { getDefaultNodeExtrasEngineData } from './getDefaultNodeExtrasEngineData';
import { getInternalModuleNodeExtrasEngineData } from './getInternalModuleNodeExtrasEngineData';
import type { NodeExtrasEngineData } from './NodeEngineData';

export function getNodeExtrasEngineData(
	nodeData: NodeData,
	graphRegistry: GraphRegistry,
): NodeExtrasEngineData {
	if (nodeData.type === 'InternalModuleNode' || nodeData.type === 'InternalModuleVoicesNode') {
		return getInternalModuleNodeExtrasEngineData(nodeData, graphRegistry);
	} else {
		return getDefaultNodeExtrasEngineData(nodeData);
	}
}
