import type { Node } from '$lib/node/data/Node.sveltevelte';
import { getNodeEngineData } from './getNodeEngineData';
import type { NodeEngineData } from './NodeEngineData';

export function getNodesEngineData(nodes: Node[]) {
	const fallback: NodeEngineData = {
		id: 0,
		input_ids: {},
		type: 'ConstantNode',
		extras: { value: 0 },
	};
	const nodesEngineData: NodeEngineData[] = nodes.map((node) =>
		getNodeEngineData(node, fallback.id),
	);
	nodesEngineData.unshift(fallback);
	return nodesEngineData;
}
