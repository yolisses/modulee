import { ById } from '$lib/editor/ById';
import { Vector } from 'nodes-editor';
import type { FormatingNode } from './FormatingNode';

type GetNextY = (node: FormatingNode) => number;

// TODO consider returning the positions instead of changing them in place
/**
 * @param nodes Must be topologically sorted beforehand
 */
export function formatNodes(nodes: FormatingNode[], getNextY: GetNextY, xStep: number) {
	const nextPositionsByLayer = [0];
	const nodesById = ById.fromItems(nodes);
	const positions = new Map<FormatingNode, Vector>();

	function visit(node: FormatingNode, parent: FormatingNode | null, layer: number) {
		if (positions.has(node)) return;

		const x = layer * xStep;

		if (nextPositionsByLayer[layer] === undefined) {
			nextPositionsByLayer[layer] = 0;
		}
		const y = nextPositionsByLayer[layer];

		const position = new Vector(x, y);
		positions.set(node, position);
		nextPositionsByLayer[layer] = getNextY(node);

		node.inputs.forEach((input) => {
			const nextNode = nodesById.get(input);
			visit(nextNode, node, layer + 1);
		});
	}

	nodes.toReversed().forEach((node) => {
		visit(node, null, 0);
	});

	return positions;
}
