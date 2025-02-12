import type { Connection } from '$lib/data/Connection';
import { Group } from '$lib/data/Group.svelte';
import type { Node } from '$lib/data/Node.svelte';
import { getNodeEngineData } from './getNodeEngineData';
import type { NodeEngineData } from './NodeEngineData';

// TODO use just Nodes data instead of Nodes
export function getNodesEngineData(nodes: Node[], groups: Group[], connections: Connection[]) {
	const fallback: NodeEngineData = {
		id: 0,
		input_ids: {},
		type: 'ConstantNode',
		extras: { value: 0 },
	};
	const nodesEngineData: NodeEngineData[] = nodes.map((node) =>
		getNodeEngineData(node, groups, fallback.id, connections),
	);
	nodesEngineData.unshift(fallback);
	return nodesEngineData;
}
