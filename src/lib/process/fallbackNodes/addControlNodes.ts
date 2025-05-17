import { Graph } from '$lib/data/Graph.svelte';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { addNodeControlNodes } from './addNodeControlNodes';

export function addControlNodes(graphRegistry: GraphRegistry) {
	const graph = new Graph(graphRegistry, []);
	graph.nodes.values().forEach((node) => addNodeControlNodes(node, graphRegistry));
}
