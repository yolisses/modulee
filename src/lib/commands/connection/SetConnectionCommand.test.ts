import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetConnectionCommand } from './SetConnectionCommand';

test('SetConnectionCommand without remotion', () => {
	const graphRegistry = { connections: new ById() } as GraphRegistry;

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

	command.execute(graphRegistry);

	expect(graphRegistry.connections.values()).toEqual([
		{
			id: 'connection1',
			targetNodeId: 'node2',
			inputPath: {
				nodeId: 'node1',
				inputKey: 'input1',
			},
		},
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.connections.values()).toEqual([]);
});

test('SetConnectionCommand with remotion', () => {
	const graphRegistry = {
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

	command.execute(graphRegistry);

	expect(graphRegistry.connections.values()).toEqual([
		{
			id: 'connection2',
			targetNodeId: 'node3',
			inputPath: {
				nodeId: 'node1',
				inputKey: 'input1',
			},
		},
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.connections.values()).toEqual([
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
