import { findById } from '$lib/array/findById';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/ExternalModuleData';

export function replaceExternalModulesByInternalModules(
	graphRegistry: GraphRegistry,
	externalModulesData: ExternalModuleData[],
) {
	externalModulesData.map((externalModuleData) => {
		externalModuleData.graph.internalModules.forEach((internalModuleData) => {
			graphRegistry.internalModules.add(internalModuleData);
		});

		externalModuleData.graph.nodes.forEach((nodeData) => {
			graphRegistry.nodes.add(nodeData);
		});
	});

	graphRegistry.nodes.values().forEach((nodeData) => {
		if (nodeData.type === 'ModuleNode' || nodeData.type === 'ModuleVoicesNode') {
			const { moduleReference: internalModuleReference } = nodeData.extras;
			const referencedExternalModuleData = findById(
				externalModulesData,
				internalModuleReference.id,
			);
			const { mainInternalModuleId } = referencedExternalModuleData.graph;
			nodeData.extras.moduleReference = { type: 'internal', id: mainInternalModuleId };
		}
	});
}
