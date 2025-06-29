import { Graph } from '$lib/graph/Graph.svelte';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { addNodeControlNodes } from './addNodeControlNodes';

export function addControlNodes(graphRegistry: GraphRegistry) {
	const graph = new Graph(graphRegistry, []);
	graph.nodes.values().forEach((node) => addNodeControlNodes(node, graphRegistry));
}
