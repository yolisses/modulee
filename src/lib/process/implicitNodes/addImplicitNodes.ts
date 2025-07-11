import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { addImplicitNodesForNode } from './addImplicitNodesForNode';

export function addImplicitNodes(graphRegistry: GraphRegistry): void {
	graphRegistry.nodes.values().forEach((node) => {
		addImplicitNodesForNode(node, graphRegistry);
	});
}
