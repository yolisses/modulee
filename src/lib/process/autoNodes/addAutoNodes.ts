import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { addAutoNodesForNode } from './addAutoNodesForNode';

export function addAutoNodes(graphRegistry: GraphRegistry): void {
	graphRegistry.nodes.values().forEach((node) => {
		addAutoNodesForNode(node, graphRegistry);
	});
}
