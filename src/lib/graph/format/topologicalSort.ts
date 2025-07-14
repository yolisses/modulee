import { ById } from '$lib/editor/ById';
import { getId } from '$lib/ui/getId';
import { CycleWithoutDelayError } from './CycleWithoutDelayError';
import type { TopologicalNode } from './TopologicalNode';

export function topologicalSort(nodes: TopologicalNode[]): string[] {
	const delayNodesOnStack = new Set<TopologicalNode>();
	const nodesById = ById.fromItems(nodes);
	const result = new Set<TopologicalNode>();
	const stack = new Set<TopologicalNode>();

	function addToStack(node: TopologicalNode) {
		stack.add(node);
		if (node.isDelay) {
			delayNodesOnStack.add(node);
		}
	}

	function removeFromStack(node: TopologicalNode) {
		stack.delete(node);
		if (node.isDelay) {
			delayNodesOnStack.delete(node);
		}
	}

	function visitInputs(node: TopologicalNode) {
		if (node.inputs.length === 0) return false;
		return node.inputs.map((input) => visit(nodesById.get(input))).some((value) => value);
	}

	function getIsLastDelayInStack(node: TopologicalNode) {
		return delayNodesOnStack.size === 1 && delayNodesOnStack.has(node);
	}

	function visit(node: TopologicalNode): boolean {
		// If already in the result, just ignore
		if (result.has(node)) return false;

		// If cycle found
		if (stack.has(node)) {
			if (getIsLastDelayInStack(node)) {
				result.add(node);
				return false;
			} else if (delayNodesOnStack.size > 0) {
				return true;
			} else {
				throw new CycleWithoutDelayError();
			}
		}

		addToStack(node);

		const gotCycle = visitInputs(node);

		if (gotCycle && getIsLastDelayInStack(node)) {
			result.add(node);
			return false;
		}

		if (!gotCycle) {
			result.add(node);
		}

		removeFromStack(node);
		return gotCycle;
	}

	nodes.forEach(visit);

	return [...result].map(getId);
}
