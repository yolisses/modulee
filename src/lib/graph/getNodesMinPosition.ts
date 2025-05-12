import type { Vector } from 'nodes-editor';

export function getNodesMinPosition(nodes: { position: Vector }[]) {
	let nodesMinPosition = nodes[0].position;
	nodes.forEach((node) => {
		nodesMinPosition = nodesMinPosition.min(node.position);
	});
	return nodesMinPosition;
}
