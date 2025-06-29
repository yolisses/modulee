import type { Node } from '$lib/node/Node.svelte';
import { Vector } from 'nodes-editor';
import { getNodeSize } from './getNodeSize';

export function getNodesAveragePosition(nodes: Node[]) {
	if (!nodes.length) {
		throw new Error('No nodes provided');
	}

	let sum = Vector.zero();
	nodes.forEach((node) => {
		sum = sum.add(node.position.add(getNodeSize(node).divideByNumber(2)));
	});
	return sum.divideByNumber(nodes.length);
}
