import { createId } from '$lib/global/createId';
import type { GraphData } from '$lib/graph/GraphData';

export function createInstrumentInitialGraphData(): GraphData {
	const mainModuleId = createId();
	const voiceModuleId = createId();
	const outputNodeId = createId();
	const voicesNodeId = createId();
	const voiceOutputNodeId = createId();
	const triangleWaveNodeId = createId();

	return {
		nodes: [
			{
				id: outputNodeId,
				type: 'OutputNode',
				extras: {},
				position: { x: 0, y: 0 },
				internalModuleId: mainModuleId,
				unconnectedInputValues: { input: 0 },
				isInputAutoConnectedMap: {},
			},
			{
				id: voicesNodeId,
				type: 'ModuleVoicesNode',
				extras: { moduleReference: { type: 'internal', moduleId: voiceModuleId } },
				position: { x: -7, y: 0 },
				internalModuleId: mainModuleId,
				unconnectedInputValues: {},
				isInputAutoConnectedMap: {},
			},
			{
				id: voiceOutputNodeId,
				type: 'OutputNode',
				extras: {},
				position: { x: 0, y: 0 },
				internalModuleId: voiceModuleId,
				unconnectedInputValues: { input: 0 },
				isInputAutoConnectedMap: {},
			},
			{
				id: triangleWaveNodeId,
				type: 'TriangleWaveNode',
				extras: {},
				position: { x: -7, y: 0 },
				internalModuleId: voiceModuleId,
				unconnectedInputValues: { phase: 0 },
				isInputAutoConnectedMap: { phase: true },
			},
		],
		connections: [
			{
				id: createId(),
				inputPath: { nodeId: outputNodeId, inputKey: 'input' },
				targetNodeId: voicesNodeId,
			},
			{
				id: createId(),
				inputPath: { nodeId: voiceOutputNodeId, inputKey: 'input' },
				targetNodeId: triangleWaveNodeId,
			},
		],
		internalModules: [
			{ id: mainModuleId, name: 'Main internal module' },
			{ id: voiceModuleId, name: 'Voice module' },
		],
		mainInternalModuleId: mainModuleId,
	};
}
