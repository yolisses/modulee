import type { Node } from '$lib/node/Node.svelte';

export function getNodesMinPosition(nodes: Node[]) {
	let nodesMinPosition = nodes[0].position;
	nodes.forEach((node) => {
		nodesMinPosition = nodesMinPosition.min(node.position);
	});
	return nodesMinPosition;
}
