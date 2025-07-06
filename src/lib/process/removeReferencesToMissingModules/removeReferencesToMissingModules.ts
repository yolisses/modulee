import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { getIsSomeModuleNodeData } from '$lib/rack/getIsSomeModuleNodeData';

export function removeReferencesToMissingModules(graphRegistry: GraphRegistry) {
	graphRegistry.nodes.values().forEach((nodeData) => {
		if (!getIsSomeModuleNodeData(nodeData)) return;
		const { moduleReference } = nodeData.extras;
		if (!moduleReference) return;
		if (graphRegistry.internalModules.containsId(moduleReference.moduleId)) return;
		nodeData.extras.moduleReference = undefined;
	});
}
