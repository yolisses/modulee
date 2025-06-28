import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { SomeModuleNodeData } from '$lib/rack/SomeModuleNodeData';
import { getExternalModuleInputKeys } from './getExternalModuleInputKeys';
import { getInternalModuleInputKeys } from './getInternalModuleInputKeys';

export function getSomeModuleNodeDataInputKeys(
	moduleNodeData: SomeModuleNodeData,
	graphRegistry: GraphRegistry,
): string[] {
	const { moduleReference } = moduleNodeData.extras;
	if (!moduleReference) {
		return [];
	}
	switch (moduleReference.type) {
		case 'internal':
			return getInternalModuleInputKeys(moduleReference.moduleId, graphRegistry);
		case 'external':
			return getExternalModuleInputKeys(moduleReference.moduleId, graphRegistry);
	}
}
