import { ById } from '$lib/editor/ById';
import { getId } from '$lib/ui/getId';
import { CycleWithoutDelayError } from './CycleWithoutDelayError';
import type { Node } from './Node';

export function topologicalSort(nodes: Node[]): string[] {
	const nodesById = ById.fromItems(nodes);
	const result = new Set<Node>();
	const stack = new Set<Node>();
	const delayNodesOnStack = new Set<Node>();

	function visit(node: Node): boolean {
		if (result.has(node)) return false;
		if (stack.has(node)) {
			// Cycle found
			if (delayNodesOnStack.size == 1 && delayNodesOnStack.has(node)) {
				result.add(node);
			} else if (delayNodesOnStack.size > 0) {
				return true;
			} else {
				throw new CycleWithoutDelayError();
			}
		}

		stack.add(node);
		if (node.isDelay) {
			delayNodesOnStack.add(node);
		}

		let gotCycle = false;
		node.inputs.forEach((input) => {
			const gotCycleInInputs = visit(nodesById.get(input));
			if (gotCycleInInputs) {
				gotCycle = true;
			}
		});

		if (gotCycle && delayNodesOnStack.size === 1 && delayNodesOnStack.has(node)) {
			result.add(node);
			return false;
		}

		if (!gotCycle) {
			result.add(node);
		}

		stack.delete(node);
		if (node.isDelay) {
			delayNodesOnStack.delete(node);
		}

		return gotCycle;
	}

	nodes.forEach((node) => {
		visit(node);
	});

	return [...result].map(getId);
}
