import type { ById } from '$lib/editor/ById';
import type { FormatingNode } from './FormatingNode';

export function getLayerByNode<T extends FormatingNode>(nodes: ById<T>) {
	const layerByNode = new Map<string, number>();

	function visit(node: T, layer: number) {
		if (layerByNode.has(node.id) && layerByNode.get(node.id)! > layer) {
			return;
		}

		layerByNode.set(node.id, layer);

		node.inputs.map((input) => {
			const nextNode = nodes.get(input);
			visit(nextNode, layer + 1);
		});
	}

	nodes.values().forEach((node) => visit(node, 0));

	return layerByNode;
}
