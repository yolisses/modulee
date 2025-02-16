import type { GraphData } from '$lib/data/GraphData';
import { ById } from '$lib/editor/ById.svelte';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetConnectionCommand } from './SetConnectionCommand';

test('SetConnectionCommand without remotion', () => {
	const graphData = { connections: new ById() } as GraphData;

	const command = new SetConnectionCommand(
		mockCommandData({
			connection: {
				id: 'connection1',
				targetNodeId: 'node2',
				inputPath: {
					nodeId: 'node1',
					inputName: 'input1',
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
				inputName: 'input1',
			},
		},
	]);

	command.undo(graphData);

	expect(graphData.connections.values()).toEqual([]);
});

test('SetConnectionCommand with remotion', () => {
	const graphData = {
		connections: new ById([
			{
				id: 'connection1',
				targetNodeId: 'node2',
				inputPath: {
					nodeId: 'node1',
					inputName: 'input1',
				},
			},
		]),
	} as GraphData;

	const command = new SetConnectionCommand(
		mockCommandData({
			connection: {
				id: 'connection2',
				targetNodeId: 'node3',
				inputPath: {
					nodeId: 'node1',
					inputName: 'input1',
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
				inputName: 'input1',
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
				inputName: 'input1',
			},
		},
	]);
});
