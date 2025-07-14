import { ById } from '$lib/editor/ById';
import { Vector } from 'nodes-editor';
import type { FormatingNode } from './FormatingNode';

// TODO consider returning the positions instead of changing them in place
export function formatNodes(nodes: FormatingNode[]) {
	const nodesById = ById.fromItems(nodes);
	const positions = new Map<FormatingNode, Vector>();

	function visit(node: FormatingNode, parent: FormatingNode | null, layer: number) {
		if (positions.has(node)) return;

		if (layer === 0) {
			positions.set(node, Vector.zero());
		}

		node.inputs.forEach((input) => {
			const nextNode = nodesById.get(input);
			visit(nextNode, node, layer + 1);
		});
	}

	nodes.forEach((node) => {
		visit(node, null, 0);
	});

	return [...positions.values()];
}
