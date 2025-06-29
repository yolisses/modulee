import { ById } from '$lib/editor/ById';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';

export function createMinimalGraphRegistry(): GraphRegistry {
	// By now, every graph needs a main internal module. It can be changed
	// latter.
	const mainInternalModule: InternalModuleData = { id: createId(), name: 'Main internal module' };
	const internalModules = new ById<InternalModuleData>();
	internalModules.add(mainInternalModule);

	return {
		internalModules,
		nodes: new ById(),
		connections: new ById(),
		externalModules: new ById(),
		mainInternalModuleId: mainInternalModule.id,
	};
}
