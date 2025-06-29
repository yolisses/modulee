import type { NodeData } from '$lib/data/NodeData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { getDefaultNodeExtrasEngineData } from './getDefaultNodeExtrasEngineData';
import { getModuleNodeExtrasEngineData } from './getInternalModuleNodeExtrasEngineData';
import type { NodeExtrasEngineData } from './NodeEngineData';

export function getNodeExtrasEngineData(
	nodeData: NodeData,
	graphRegistry: GraphRegistry,
): NodeExtrasEngineData {
	if (nodeData.type === 'ModuleNode' || nodeData.type === 'ModuleVoicesNode') {
		return getModuleNodeExtrasEngineData(nodeData, graphRegistry);
	} else {
		return getDefaultNodeExtrasEngineData(nodeData);
	}
}
