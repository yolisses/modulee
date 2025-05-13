import type { Node } from '$lib/data/Node.svelte';
import { Vector } from 'nodes-editor';

export function getNodesAveragePosition(nodes: Node[]) {
	if (!nodes.length) {
		throw new Error('No nodes provided');
	}

	let sum = Vector.zero();
	nodes.forEach((node) => {
		sum = sum.add(node.position);
	});
	return sum.divideByNumber(nodes.length);
}
