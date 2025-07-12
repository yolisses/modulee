import { ById } from '$lib/editor/ById';
import { getId } from '$lib/ui/getId';
import type { Node } from './Node';

export function topologicalSort(nodes: Node[]): string[] {
	const nodesById = ById.fromItems(nodes);
	const result = new Set<Node>();

	function visit(node: Node) {
		if (result.has(node)) return;
		node.inputs.forEach((input) => {
			visit(nodesById.get(input));
		});

		result.add(node);
	}

	nodes.forEach(visit);

	return [...result].map(getId);
}
