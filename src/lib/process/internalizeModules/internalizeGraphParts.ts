import type { GraphData } from '$lib/graph/GraphData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export function internalizeGraphParts(graphRegistry: GraphRegistry, externalGraphData: GraphData) {
	externalGraphData.nodes.forEach((nodeData) => {
		graphRegistry.nodes.add(nodeData);
	});

	externalGraphData.connections.forEach((connectionData) => {
		graphRegistry.connections.add(connectionData);
	});

	externalGraphData.internalModules.forEach((internalModuleData) => {
		graphRegistry.internalModules.add(internalModuleData);
	});
}
