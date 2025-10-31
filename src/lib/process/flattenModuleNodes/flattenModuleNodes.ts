import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { cloneGraphRegistry } from '../cloneGraphRegistry';
import { FlatteningGraph } from './FlatteningGraph';

export function flattenModuleNodes(graphRegistry: GraphRegistry) {
	const flatteningGraph = new FlatteningGraph(cloneGraphRegistry(graphRegistry));
	const result = flatteningGraph.flatten();
	graphRegistry.nodes = result.nodes;
	graphRegistry.connections = result.connections;
}
