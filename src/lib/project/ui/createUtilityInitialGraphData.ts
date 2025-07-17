import { createId } from '$lib/global/createId';
import type { GraphData } from '$lib/graph/GraphData';

export function createUtilityInitialGraphData(): GraphData {
	const mainInternalModuleId = createId();

	return {
		connections: [],
		internalModules: [{ id: mainInternalModuleId, name: 'Main internal module' }],
		mainInternalModuleId: mainInternalModuleId,
		nodes: [
			{
				extras: {},
				id: createId(),
				internalModuleId: mainInternalModuleId,
				isInputAutoConnectedMap: {},
				position: { x: 0, y: 0 },
				type: 'OutputNode',
				unconnectedInputValues: { input: 0 },
			},
		],
	};
}
