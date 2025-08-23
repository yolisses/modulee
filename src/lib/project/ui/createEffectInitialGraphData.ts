import { createId } from '$lib/global/createId';
import type { GraphData } from '$lib/graph/GraphData';

export function createEffectInitialGraphData(): GraphData {
	const mainInternalModuleId = createId();

	return {
		connections: [],
		internalModules: [{ id: mainInternalModuleId, name: 'Main internal module' }],
		mainInternalModuleId: mainInternalModuleId,
		nodes: [
			{
				extras: { channel: 0 },
				id: createId(),
				internalModuleId: mainInternalModuleId,
				isInputAutoConnectedMap: {},
				position: { x: 0, y: 0 },
				type: 'OutputNode',
				unconnectedInputValues: { input: 0 },
			},
			{
				extras: {},
				id: createId(),
				internalModuleId: mainInternalModuleId,
				isInputAutoConnectedMap: {},
				position: { x: -14, y: 0 },
				type: 'AudioInputNode',
				unconnectedInputValues: {},
			},
		],
	};
}
