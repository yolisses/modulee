import type { GraphData } from '$lib/graph/GraphData';
import { getGraphData } from '$lib/project/getGraphData';
import { getGraphRegistry } from '$lib/project/getGraphRegistry';
import { expect, test, vi } from 'vitest';
import { flattenModuleNodes } from './flattenModuleNodes';

test('flattenModuleNodes', () => {
	vi.mock('$lib/global/createId', () => {
		let counter = 8;
		return {
			counter,
			createId: () => 'node' + counter++,
		};
	});

	const graphData = {
		internalModules: [{ id: 'module1' }, { id: 'module2' }],
		nodes: [
			{ id: 'node1', internalModuleId: 'module1' },
			{ id: 'node2', internalModuleId: 'module1' },
			{
				id: 'node3',
				internalModuleId: 'module1',
				type: 'ModuleNode',
				extras: { moduleReference: { moduleId: 'module2' } },
			},
			{ id: 'node4', internalModuleId: 'module2', type: 'InputNode' },
			{ id: 'node5', internalModuleId: 'module2' },
			{ id: 'node6', internalModuleId: 'module2' },
			{ id: 'node7', internalModuleId: 'module1' },
		],
		connections: [
			{ id: 'connection1', inputPath: { nodeId: 'node2' }, targetNodeId: 'node1' },
			{
				id: 'connection2',
				inputPath: { nodeId: 'node3', inputKey: 'node4' },
				targetNodeId: 'node2',
			},
			{
				id: 'connection3',
				inputPath: { nodeId: 'node5', inputKey: 'input1' },
				targetNodeId: 'node4',
			},
			{ id: 'connection4', inputPath: { nodeId: 'node6' }, targetNodeId: 'node5' },
			{ id: 'connection5', inputPath: { nodeId: 'node7' }, targetNodeId: 'node3' },
		],
	} as GraphData;
	const graphRegistry = getGraphRegistry(graphData, []);

	flattenModuleNodes(graphRegistry);

	expect(getGraphData(graphRegistry)).toEqual({
		internalModules: [{ id: 'module1' }, { id: 'module2' }],
		nodes: [
			{ id: 'node1', internalModuleId: 'module1' },
			{ id: 'node2', internalModuleId: 'module1' },
			{ id: 'node8', internalModuleId: 'module1' },
			{ id: 'node9', internalModuleId: 'module1' },
			{ id: 'node7', internalModuleId: 'module1' },
		],
		connections: [
			{ id: 'connection1', inputPath: { nodeId: 'node2' }, targetNodeId: 'node1' },
			{
				id: 'connection3',
				inputPath: { nodeId: 'node5', inputKey: 'input1' },
				targetNodeId: 'node2',
			},
			{ id: 'connection4', inputPath: { nodeId: 'node6' }, targetNodeId: 'node5' },
			{ id: 'connection5', inputPath: { nodeId: 'node7' }, targetNodeId: 'node6' },
		],
	} as GraphData);
});
