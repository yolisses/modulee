import { createId } from '$lib/data/createId';
import type { GraphData } from '$lib/data/GraphData';

export function fakeGraphData(): GraphData {
	return {
		nodes: [],
		connections: [],
		internalModules: [],
		externalModuleReferences: [],
		mainInternalModuleId: createId(),
	};
}
