import { createId } from '$lib/global/createId';
import type { GraphData } from '$lib/graph/GraphData';

export function createEffectInitialGraphData(): GraphData {
	const mainInternalModuleId = createId();

	return {
		connections: [],
		internalModules: [
			{
				id: mainInternalModuleId,
				name: 'Main internal module',
			},
		],
		mainInternalModuleId: mainInternalModuleId,
		nodes: [
			{
				extras: {},
				id: createId(),
				internalModuleId: mainInternalModuleId,
				isInputAutoConnectedMap: {},
				position: {
					x: 0,
					y: 2,
				},
				type: 'OutputNode',
				unconnectedInputValues: {
					input: 0,
				},
			},
			{
				extras: {},
				id: createId(),
				internalModuleId: mainInternalModuleId,
				isInputAutoConnectedMap: {},
				position: {
					x: -14,
					y: 2,
				},
				type: 'AudioInputNode',
				unconnectedInputValues: {},
			},
		],
	};
}
