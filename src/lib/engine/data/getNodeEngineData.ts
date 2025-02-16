import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { getNodeExtrasEngineData } from './getNodeExtrasEngineData';
import { getNodeInputIdsEngineData } from './getNodeInputIdsEngineData';
import { hashToUsize } from './hashToUsize';
import type { NodeEngineData } from './NodeEngineData';

export function getNodeEngineData(nodeData: NodeData, graphData: GraphData): NodeEngineData {
	const extras = getNodeExtrasEngineData(nodeData, graphData);
	const inputIds = getNodeInputIdsEngineData(nodeData, graphData);

	return {
		extras,
		type: nodeData.type,
		input_ids: inputIds,
		id: hashToUsize(nodeData.id),
	};
}
