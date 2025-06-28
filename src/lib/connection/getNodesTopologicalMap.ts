import type { Node } from '$lib/data/Node.svelte';
import { getIsDefined } from './getIsDefined';
import type { TopologicalMap } from './TopologicalMap';

export function getGraphTopologicalMap(nodes: Node[]) {
	const topologicalMap: TopologicalMap = new Map();
	nodes.forEach((node) => {
		topologicalMap.set(
			node.id,
			node.inputs
				.map((input) => {
					return input.targetNode?.id;
				})
				.filter(getIsDefined),
		);
	});
	return topologicalMap;
}
