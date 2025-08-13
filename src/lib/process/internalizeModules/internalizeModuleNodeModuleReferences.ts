import type { GraphRegistry } from '$lib/graph/GraphRegistry';

export function internalizeModuleNodeModuleReferences(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		const isSomeModuleNode = nodeData.type === 'ModuleNode' || nodeData.type === 'ModuleVoicesNode';
		if (!isSomeModuleNode) return;

		const { moduleReference } = nodeData.extras;
		if (moduleReference?.type === 'external') {
			const referencedExternalModuleData = graphRegistry.externalModules.getOrNull(
				moduleReference.moduleId,
			);
			if (!referencedExternalModuleData) return;
			const { mainInternalModuleId } = referencedExternalModuleData.graph;
			nodeData.extras.moduleReference = { type: 'internal', moduleId: mainInternalModuleId };
		}
	});
}
