import { ById } from '$lib/editor/ById';
import { getId } from '$lib/ui/getId';
import { CycleWithoutDelayError } from './CycleWithoutDelayError';
import type { Node } from './Node';

export function topologicalSort(nodes: Node[]): string[] {
	const nodesById = ById.fromItems(nodes);
	const result = new Set<Node>();
	const stack = new Set<Node>();
	const delayNodesOnStack = new Set<Node>();

	function visit(node: Node) {
		console.log(node.id);
		if (result.has(node)) return;
		if (stack.has(node)) {
			// Cycle found
			if (delayNodesOnStack.size == 1 && node.isDelay) {
				result.add(node);
			} else if (delayNodesOnStack.size > 0) {
				return;
			} else {
				throw new CycleWithoutDelayError();
			}
		}

		stack.add(node);
		if (node.isDelay) {
			delayNodesOnStack.add(node);
		}

		node.inputs.forEach((input) => {
			visit(nodesById.get(input));
		});

		result.add(node);
		stack.delete(node);
		if (node.isDelay) {
			delayNodesOnStack.delete(node);
		}
	}

	nodes.forEach(visit);

	return [...result].map(getId);
}
