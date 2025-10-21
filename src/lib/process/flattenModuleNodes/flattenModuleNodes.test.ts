import type { GraphData } from '$lib/graph/GraphData';
import { getGraphData } from '$lib/project/getGraphData';
import { getGraphRegistry } from '$lib/project/getGraphRegistry';
import { describe, expect, it, vi } from 'vitest';
import { flattenModuleNodes } from './flattenModuleNodes';

function mockCreateId() {
	vi.mock('$lib/global/createId', () => {
		let counter = 1;
		return { counter, createId: () => 'newId' + counter++ };
	});
}

describe('flattenModuleNodes', () => {
	it('does not interfere nodes unrelated to module', () => {
		mockCreateId();
		const graphData = {
			internalModules: [{ id: 'module1' }, { id: 'module2' }],
			nodes: [
				{ id: 'node1', internalModuleId: 'module1' },
				{ id: 'node2', internalModuleId: 'module1' },
				{ id: 'node3', internalModuleId: 'module1' },
				{ id: 'node4', internalModuleId: 'module2' },
				{ id: 'node5', internalModuleId: 'module2' },
				{ id: 'node6', internalModuleId: 'module2' },
			],
			connections: [
				{ id: 'connection1', inputPath: { nodeId: 'node2' }, targetNodeId: 'node1' },
				{ id: 'connection2', inputPath: { nodeId: 'node3' }, targetNodeId: 'node2' },
				{ id: 'connection3', inputPath: { nodeId: 'node5' }, targetNodeId: 'node4' },
				{ id: 'connection4', inputPath: { nodeId: 'node6' }, targetNodeId: 'node5' },
			],
		} as GraphData;
		const graphRegistry = getGraphRegistry(graphData, []);

		flattenModuleNodes(graphRegistry);

		expect(getGraphData(graphRegistry)).toEqual(graphData);
	});

	it.only('replaces module nodes by the module nodes', () => {
		mockCreateId();
		const graphData = {
			mainInternalModuleId: 'module1',
			internalModules: [{ id: 'module1' }, { id: 'module2' }],
			nodes: [
				{
					id: 'node1',
					internalModuleId: 'module1',
					type: 'ModuleNode',
					extras: { moduleReference: { moduleId: 'module2' } },
				},
				{ id: 'node2', internalModuleId: 'module2' },
				{ id: 'node3', internalModuleId: 'module2' },
			],
			connections: [{ id: 'connection1', inputPath: { nodeId: 'node3' }, targetNodeId: 'node2' }],
		} as GraphData;
		const graphRegistry = getGraphRegistry(graphData, []);

		flattenModuleNodes(graphRegistry);

		expect(getGraphData(graphRegistry)).toEqual({
			mainInternalModuleId: 'module1',
			internalModules: [{ id: 'module1' }, { id: 'module2' }],
			nodes: [
				{ id: 'node2', internalModuleId: 'module2' },
				{ id: 'node3', internalModuleId: 'module2' },
				{ id: 'newId1', internalModuleId: 'module1' },
				{ id: 'newId2', internalModuleId: 'module1' },
			],
			connections: [
				//
				{ id: 'connection1', inputPath: { nodeId: 'node3' }, targetNodeId: 'node2' },
				{ id: 'newId3', inputPath: { nodeId: 'newId2' }, targetNodeId: 'newId1' },
			],
		} as GraphData);
	});

	it('replaces module nodes by the module nodes and replaces input nodes', () => {
		mockCreateId();
		const graphData = {
			mainInternalModuleId: 'module1',
			internalModules: [{ id: 'module1' }, { id: 'module2' }],
			nodes: [
				{ id: 'node1', internalModuleId: 'module1' },
				{
					id: 'node2',
					internalModuleId: 'module1',
					type: 'ModuleNode',
					extras: { moduleReference: { moduleId: 'module2' } },
				},
				{ id: 'node3', internalModuleId: 'module2', type: 'InputNode' },
				{ id: 'node4', internalModuleId: 'module2' },
			],
			connections: [
				{
					id: 'connection1',
					inputPath: { nodeId: 'node2', inputKey: 'node3' },
					targetNodeId: 'node1',
				},
				{
					id: 'connection2',
					inputPath: { nodeId: 'node4', inputKey: 'input1' },
					targetNodeId: 'node3',
				},
			],
		} as GraphData;
		const graphRegistry = getGraphRegistry(graphData, []);

		flattenModuleNodes(graphRegistry);

		expect(getGraphData(graphRegistry)).toEqual({
			mainInternalModuleId: 'module1',
			internalModules: [{ id: 'module1' }, { id: 'module2' }],
			nodes: [
				{ id: 'node1', internalModuleId: 'module1' },
				{ id: 'node3', internalModuleId: 'module2', type: 'InputNode' },
				{ id: 'node4', internalModuleId: 'module2' },
				{ id: 'newId4', internalModuleId: 'module1' },
			],
			connections: [
				{ id: 'connection2', inputPath: { nodeId: 'node4' }, targetNodeId: 'node3' },
				{
					id: 'newId5',
					inputPath: { nodeId: 'newId4', inputKey: 'input1' },
					targetNodeId: 'node1',
				},
			],
		} as GraphData);
	});
});
