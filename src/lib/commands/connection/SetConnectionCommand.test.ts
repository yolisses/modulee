import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetConnectionCommand } from './SetConnectionCommand';

test('SetConnectionCommand without remotion', () => {
	const graphData = { connections: new ById() } as GraphRegistry;

	const command = new SetConnectionCommand(
		mockCommandData({
			connection: {
				id: 'connection1',
				targetNodeId: 'node2',
				inputPath: {
					nodeId: 'node1',
					inputKey: 'input1',
				},
			},
		}),
	);

	command.execute(graphData);

	expect(graphData.connections.values()).toEqual([
		{
			id: 'connection1',
			targetNodeId: 'node2',
			inputPath: {
				nodeId: 'node1',
				inputKey: 'input1',
			},
		},
	]);

	command.undo(graphData);

	expect(graphData.connections.values()).toEqual([]);
});

test('SetConnectionCommand with remotion', () => {
	const graphData = {
		connections: ById.fromItems([
			{
				id: 'connection1',
				targetNodeId: 'node2',
				inputPath: {
					nodeId: 'node1',
					inputKey: 'input1',
				},
			},
		]),
	} as GraphRegistry;

	const command = new SetConnectionCommand(
		mockCommandData({
			connection: {
				id: 'connection2',
				targetNodeId: 'node3',
				inputPath: {
					nodeId: 'node1',
					inputKey: 'input1',
				},
			},
		}),
	);

	command.execute(graphData);

	expect(graphData.connections.values()).toEqual([
		{
			id: 'connection2',
			targetNodeId: 'node3',
			inputPath: {
				nodeId: 'node1',
				inputKey: 'input1',
			},
		},
	]);

	command.undo(graphData);

	expect(graphData.connections.values()).toEqual([
		{
			id: 'connection1',
			targetNodeId: 'node2',
			inputPath: {
				nodeId: 'node1',
				inputKey: 'input1',
			},
		},
	]);
});
