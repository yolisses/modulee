import { ById } from '$lib/editor/ById';
import { Vector } from 'nodes-editor';
import type { FormatingNode } from './FormatingNode';

type GetNodeYSpace<T extends FormatingNode> = (node: T) => number;

// TODO consider returning the positions instead of changing them in place
/**
 * @param nodes Must be topologically sorted beforehand
 */
export function formatNodes<T extends FormatingNode>(
	nodes: T[],
	getNodeYSpace: GetNodeYSpace<T>,
	xStep: number,
) {
	const nextPositionsByLayer = [0];
	const nodesById = ById.fromItems(nodes);
	const positions = new Map<T, Vector>();

	function visit(node: T, minY: number, layer: number) {
		if (positions.has(node)) return;

		const x = layer * xStep;

		if (nextPositionsByLayer[layer] === undefined) {
			nextPositionsByLayer[layer] = minY;
		}
		let y = nextPositionsByLayer[layer];
		y = Math.max(y, minY);

		const position = new Vector(x, y);
		positions.set(node, position);
		nextPositionsByLayer[layer] += getNodeYSpace(node);

		node.inputs.forEach((input) => {
			const nextNode = nodesById.get(input);
			visit(nextNode, y, layer + 1);
		});
	}

	nodes.toReversed().forEach((node) => {
		visit(node, 0, 0);
	});

	return positions;
}
