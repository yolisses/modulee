import type { ById } from '$lib/editor/ById';

type Node = {
	id: string;
	inputs: string[];
};

export function getLayerByNode<T extends Node>(nodes: ById<T>) {
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
