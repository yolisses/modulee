import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { getDefaultNodeExtrasEngineData } from './getDefaultNodeExtrasEngineData';
import { getGroupNodeExtrasEngineData } from './getGroupNodeExtrasEngineData';
import type { NodeExtrasEngineData } from './NodeEngineData';

export function getNodeExtrasEngineData(
	nodeData: NodeData,
	graphData: GraphData,
): NodeExtrasEngineData {
	if (['GroupNode', 'GroupVoicesNode'].includes(nodeData.type)) {
		return getGroupNodeExtrasEngineData(nodeData, graphData);
	} else {
		return getDefaultNodeExtrasEngineData(nodeData);
	}
}
