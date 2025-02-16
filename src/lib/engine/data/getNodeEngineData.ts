import type { Connection } from '$lib/data/Connection';
import type { Node } from '$lib/data/Node.svelte';
import { getNodeExtrasEngineData } from './getNodeExtrasEngineData';
import { getNodeInputIdsEngineData } from './getNodeInputIdsEngineData';
import { hashToUsize } from './hashToUsize';
import type { NodeEngineData } from './NodeEngineData';

export function getNodeEngineData(
	node: Node,
	fallbackNodeId: number,
	connections: Connection[],
): NodeEngineData {
	const extras = getNodeExtrasEngineData(node, fallbackNodeId, connections);
	const inputIds = getNodeInputIdsEngineData(node, fallbackNodeId, connections);

	return {
		extras,
		type: node.type,
		input_ids: inputIds,
		id: hashToUsize(node.id),
	};
}
