import type { NodeData } from '$lib/data/NodeData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { getNodeExtrasEngineData } from './getNodeExtrasEngineData';
import { getNodeInputIdsEngineData } from './getNodeInputIdsEngineData';
import { hashToUsize } from './hashToUsize';
import type { NodeEngineData } from './NodeEngineData';

export function getNodeEngineData(
	nodeData: NodeData,
	graphRegistry: GraphRegistry,
): NodeEngineData {
	const extras = getNodeExtrasEngineData(nodeData, graphRegistry);
	const inputIds = getNodeInputIdsEngineData(nodeData, graphRegistry);

	return {
		extras,
		type: nodeData.type,
		input_ids: inputIds,
		id: hashToUsize(nodeData.id),
	};
}
