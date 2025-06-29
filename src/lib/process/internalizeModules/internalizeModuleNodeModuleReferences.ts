import { findOrNullById } from '$lib/array/findOrNullById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';

export function internalizeModuleNodeModuleReferences(
	graphRegistry: GraphRegistry,
	externalModulesData: ExternalModuleData[],
) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		const isSomeModuleNode = nodeData.type === 'ModuleNode' || nodeData.type === 'ModuleVoicesNode';
		if (!isSomeModuleNode) return;

		if (nodeData.extras.moduleReference?.type === 'external') {
			const { moduleReference: internalModuleReference } = nodeData.extras;
			const referencedExternalModuleData = findOrNullById(
				externalModulesData,
				internalModuleReference.moduleId,
			);
			if (!referencedExternalModuleData) return;
			const { mainInternalModuleId } = referencedExternalModuleData.graph;
			nodeData.extras.moduleReference = { type: 'internal', moduleId: mainInternalModuleId };
		}
	});
}
