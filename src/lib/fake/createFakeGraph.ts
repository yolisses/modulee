import { createId } from '$lib/data/createId';
import type { GraphData } from '$lib/data/GraphData';

export function createFakeGraph(): GraphData {
	const mainInternalModuleId = createId();
	return {
		nodes: [],
		connections: [],
		mainInternalModuleId,
		externalModuleReferences: [],
		internalModules: [{ name: 'Main module', id: mainInternalModuleId }],
	};
}
