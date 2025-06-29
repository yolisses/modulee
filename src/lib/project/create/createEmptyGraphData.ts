import { createId } from '$lib/global/createId';
import type { GraphData } from '$lib/graph/GraphData';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';

export function createEmptyGraphData(): GraphData {
	const mainInternalModule: InternalModuleData = { id: createId(), name: 'Main internal module' };
	return {
		nodes: [],
		connections: [],
		internalModules: [mainInternalModule],
		mainInternalModuleId: mainInternalModule.id,
	};
}
