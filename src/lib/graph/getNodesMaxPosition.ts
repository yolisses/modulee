import type { Vector } from 'nodes-editor';
import { nodeSize } from '../dev/devNodeSize';

export function getNodesMaxPosition(nodes: { position: Vector }[]) {
	let nodesMaxPosition = nodes[0].position.addByNumber(nodeSize);
	nodes.forEach((node) => {
		nodesMaxPosition = nodesMaxPosition.max(node.position.addByNumber(nodeSize));
	});
	return nodesMaxPosition;
}
