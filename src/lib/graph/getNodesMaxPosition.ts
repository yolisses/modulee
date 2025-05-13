import type { Node } from '$lib/data/Node.svelte';

export function getNodesMaxPosition(nodes: Node[]) {
	let nodesMaxPosition = nodes[0].position;
	nodes.forEach((node) => {
		nodesMaxPosition = nodesMaxPosition.max(node.position);
	});
	return nodesMaxPosition;
}
