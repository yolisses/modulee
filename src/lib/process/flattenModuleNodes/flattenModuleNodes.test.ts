import { idOrder } from '$lib/array/idOrder';
import type { ConnectionData } from '$lib/connection/ConnectionData';
import type { GraphData } from '$lib/graph/GraphData';
import type { NodeData } from '$lib/node/data/NodeData';
import { getGraphData } from '$lib/project/getGraphData';
import { getGraphRegistry } from '$lib/project/getGraphRegistry';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { flattenModuleNodes } from './flattenModuleNodes';

import * as idModule from '$lib/global/createId';

describe('flattenModuleNodes', () => {
	let counter: number;

	beforeEach(() => {
		// Reset counter before each test (`it`)
		counter = 1;

		// Mock the module
		vi.spyOn(idModule, 'createId').mockImplementation(() => {
			return 'newId' + counter++;
		});
	});

	it('does not interfere nodes unrelated to module', () => {
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

	it('replaces module nodes by the module nodes', () => {
		const graphData = {
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

		const nodes = getGraphData(graphRegistry).nodes.sort(idOrder);
		expect(nodes).toEqual([
			{
				extras: { value: 0 },
				id: 'node1_placeholder',
				internalModuleId: 'module1',
				isInputAutoConnectedMap: {},
				position: { x: 0, y: 0 },
				type: 'ConstantNode',
				unconnectedInputValues: {},
			},
			{ id: 'node2', internalModuleId: 'module2' },
			{ id: 'node2_for_node1', internalModuleId: 'module1' },
			{ id: 'node3', internalModuleId: 'module2' },
			{ id: 'node3_for_node1', internalModuleId: 'module1' },
		] as NodeData[]);

		const connections = getGraphData(graphRegistry).connections.sort(idOrder);
		expect(connections).toEqual([
			{ id: 'connection1', inputPath: { nodeId: 'node3' }, targetNodeId: 'node2' },
			{
				id: 'connection1_for_node1',
				inputPath: { nodeId: 'node3_for_node1' },
				targetNodeId: 'node2_for_node1',
			},
		] as ConnectionData[]);
	});

	it.only('replaces module nodes by the module nodes and replaces output nodes', () => {
		const graphData = {
			internalModules: [{ id: 'module1' }, { id: 'module2' }],
			nodes: [
				{
					id: 'node1',
					internalModuleId: 'module1',
					type: 'ModuleNode',
					extras: { moduleReference: { moduleId: 'module2' } },
				},
				{ id: 'node2', internalModuleId: 'module1' },
				{ id: 'node3', internalModuleId: 'module2' },
				{ id: 'node4', internalModuleId: 'module2', type: 'OutputNode' },
			],
			connections: [
				{ id: 'connection1', inputPath: { nodeId: 'node2' }, targetNodeId: 'node1' },
				{ id: 'connection2', inputPath: { nodeId: 'node4' }, targetNodeId: 'node3' },
			],
		} as GraphData;
		const graphRegistry = getGraphRegistry(graphData, []);

		flattenModuleNodes(graphRegistry);

		const nodes = getGraphData(graphRegistry).nodes.sort(idOrder);
		expect(nodes).toEqual([
			{ id: 'node2', internalModuleId: 'module1' },
			{ id: 'node3', internalModuleId: 'module2' },
			{ id: 'node3_for_node1', internalModuleId: 'module1' },
			{ id: 'node4', internalModuleId: 'module2', type: 'OutputNode' },
		] as NodeData[]);

		const connections = getGraphData(graphRegistry).connections.sort(idOrder);
		console.log(connections);

		expect(connections).toEqual([
			{ id: 'connection1', inputPath: { nodeId: 'node2' }, targetNodeId: 'node3_for_node1' },
			{ id: 'connection2', inputPath: { nodeId: 'node4' }, targetNodeId: 'node3' },
		] as ConnectionData[]);
	});

	it('replaces module nodes by the module nodes and replaces input nodes', () => {
		const graphData = {
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

		const nodes = getGraphData(graphRegistry).nodes.sort(idOrder);
		expect(nodes).toEqual([
			{ id: 'node1', internalModuleId: 'module1' },
			{ id: 'node4_into_module1', internalModuleId: 'module1' },
			{ id: 'node3', internalModuleId: 'module2', type: 'InputNode' },
			{ id: 'node4', internalModuleId: 'module2' },
		] as NodeData[]);

		const connections = getGraphData(graphRegistry).connections.sort(idOrder);
		expect(connections).toEqual([
			{
				id: 'connection2_into_module1',
				inputPath: { nodeId: 'node4_into_module1', inputKey: 'input1' },
				targetNodeId: 'node1',
			},
			{
				id: 'connection2',
				inputPath: { nodeId: 'node4', inputKey: 'input1' },
				targetNodeId: 'node3',
			},
		] as ConnectionData[]);
	});
});
