import { ById } from '$lib/editor/ById';
import { getId } from '$lib/ui/getId';
import { CycleWithoutDelayError } from './CycleWithoutDelayError';
import type { Node } from './Node';

export function topologicalSort(nodes: Node[]): string[] {
	const nodesById = ById.fromItems(nodes);
	const result = new Set<Node>();
	const stack = new Set<Node>();

	function visit(node: Node) {
		if (result.has(node)) return;
		if (stack.has(node)) throw new CycleWithoutDelayError();

		stack.add(node);

		node.inputs.forEach((input) => {
			visit(nodesById.get(input));
		});

		result.add(node);
		stack.delete(node);
	}

	nodes.forEach(visit);

	return [...result].map(getId);
}
