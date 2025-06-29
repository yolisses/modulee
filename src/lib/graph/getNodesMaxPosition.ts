import type { Node } from '$lib/node/Node.svelte';
import { getNodeMaxPosition } from './getNodeMaxPosition';

export function getNodesMaxPosition(nodes: Node[]) {
	let nodesMaxPosition = getNodeMaxPosition(nodes[0]);
	nodes.forEach((node) => {
		nodesMaxPosition = nodesMaxPosition.max(getNodeMaxPosition(node));
	});
	return nodesMaxPosition;
}
