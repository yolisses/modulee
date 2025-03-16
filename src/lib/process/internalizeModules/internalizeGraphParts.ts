import type { GraphData } from '$lib/data/GraphData';
import type { GraphRegistry } from '$lib/data/GraphRegistry';

export function internalizeGraphParts(graphRegistry: GraphRegistry, externalGraphData: GraphData) {
	externalGraphData.internalModules.forEach((internalModuleData) => {
		graphRegistry.internalModules.add(internalModuleData);
	});

	externalGraphData.nodes.forEach((nodeData) => {
		graphRegistry.nodes.add(nodeData);
	});
}
