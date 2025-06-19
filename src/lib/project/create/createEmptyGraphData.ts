import { createId } from '$lib/data/createId';
import type { GraphData } from '$lib/data/GraphData';
import type { InternalModuleData } from '$lib/data/InternalModuleData';

export function createEmptyGraphData(): GraphData {
	const mainInternalModule: InternalModuleData = { id: createId(), name: 'Main internal module' };
	return {
		nodes: [],
		connections: [],
		internalModules: [mainInternalModule],
		mainInternalModuleId: mainInternalModule.id,
	};
}
