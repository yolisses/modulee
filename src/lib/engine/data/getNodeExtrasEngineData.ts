import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { getDefaultNodeExtrasEngineData } from './getDefaultNodeExtrasEngineData';
import { getGroupNodeExtrasEngineData } from './getGroupNodeExtrasEngineData';
import type { NodeExtrasEngineData } from './NodeEngineData';

export function getNodeExtrasEngineData(
	nodeData: NodeData,
	graphData: GraphRegistry,
): NodeExtrasEngineData {
	if (nodeData.type === 'GroupNode' || nodeData.type === 'GroupVoicesNode') {
		return getGroupNodeExtrasEngineData(nodeData, graphData);
	} else {
		return getDefaultNodeExtrasEngineData(nodeData);
	}
}
