export function getTopologicalOrder(graph: Map<string, string[]>): string[] {
	const result: string[] = [];
	const visited = new Set<string>();

	function dfs(node: string) {
		if (visited.has(node)) {
			return;
		}
		visited.add(node);

		const neighbors = graph.get(node);
		if (neighbors) {
			for (const neighbor of neighbors) {
				dfs(neighbor);
			}
		}

		result.push(node);
	}

	for (const node of graph.keys()) {
		if (!visited.has(node)) {
			dfs(node);
		}
	}

	// No need to reverse, as nodes are pushed after visiting dependencies
	return result;
}
