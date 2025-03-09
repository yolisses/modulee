import type { GraphData } from '$lib/data/GraphData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';

export function getGraphRegistry(graphData: GraphData): GraphRegistry {
	const { nodes, connections, groups } = structuredClone(graphData);
	return {
		nodes: ById.fromItems(nodes),
		groups: ById.fromItems(groups),
		connections: ById.fromItems(connections),
		mainGroupId: graphData.mainGroupId,
	};
}
