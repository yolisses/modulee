import { ById } from '$lib/editor/ById';
import { Vector } from 'nodes-editor';
import type { FormatingNode } from './FormatingNode';
import { getLayerByNode } from './getLayerByNode';

// TODO consider returning the positions instead of changing them in place
/**
 * @param nodes Must be topologically sorted beforehand
 */
export function formatNodes<T extends FormatingNode>(nodes: T[], nodeWidth: number, gap: number) {
	const nextPositionsByLayer = [0];
	const nodesById = ById.fromItems(nodes);
	const positions = new Map<T, Vector>();
	const layerByNode = getLayerByNode(ById.fromItems(nodes));

	function visit(node: T, minY: number, layer: number) {
		if (positions.has(node)) return;
		if (layerByNode.get(node.id) !== layer) return;

		const x = -layer * (nodeWidth + gap);

		if (nextPositionsByLayer[layer] === undefined) {
			nextPositionsByLayer[layer] = minY;
		}
		let y = nextPositionsByLayer[layer];
		y = Math.max(y, minY);

		const position = new Vector(x, y);
		positions.set(node, position);
		nextPositionsByLayer[layer] += node.height + gap;

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
