interface Node {
	id: string;
	isDelay: boolean;
	inputs: string[];
}

export function topologicalSort(nodes: Node[]): string[] | null {
	const visited = new Set<string>();
	const recStack = new Set<string>();
	const result: string[] = [];

	function dfs(nodeId: string, parentStack: Set<string> = new Set()): boolean {
		if (recStack.has(nodeId)) {
			// Cycle detected, check if it contains a delay node
			const cycleHasDelay = Array.from(parentStack).some((id) => {
				const node = nodes.find((n) => n.id === id);
				return node?.isDelay || false;
			});
			return cycleHasDelay;
		}

		if (visited.has(nodeId)) {
			return true;
		}

		visited.add(nodeId);
		recStack.add(nodeId);
		parentStack.add(nodeId);

		const node = nodes.find((n) => n.id === nodeId);
		if (!node) {
			recStack.delete(nodeId);
			parentStack.delete(nodeId);
			return false;
		}

		for (const inputId of node.inputs) {
			if (!dfs(inputId, parentStack)) {
				recStack.delete(nodeId);
				parentStack.delete(nodeId);
				return false;
			}
		}

		recStack.delete(nodeId);
		parentStack.delete(nodeId);
		result.push(nodeId);
		return true;
	}

	for (const node of nodes) {
		if (!visited.has(node.id)) {
			if (!dfs(node.id)) {
				return null; // Invalid graph: cycle without delay node or invalid reference
			}
		}
	}

	return result; // Return without reversing to match expected order
}
