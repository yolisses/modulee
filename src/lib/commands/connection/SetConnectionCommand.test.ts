import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetConnectionCommand } from './SetConnectionCommand';

test('SetConnectionCommand without remotion', () => {
	const editorData = { connections: new ById() } as EditorData;

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

	command.execute(editorData);

	expect(editorData.connections.values()).toEqual([
		{
			id: 'connection1',
			targetNodeId: 'node2',
			inputPath: {
				nodeId: 'node1',
				inputName: 'input1',
			},
		},
	]);

	command.undo(editorData);

	expect(editorData.connections.values()).toEqual([]);
});

test('SetConnectionCommand with remotion', () => {
	const editorData = {
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
	} as EditorData;

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

	command.execute(editorData);

	expect(editorData.connections.values()).toEqual([
		{
			id: 'connection2',
			targetNodeId: 'node3',
			inputPath: {
				nodeId: 'node1',
				inputName: 'input1',
			},
		},
	]);

	command.undo(editorData);

	expect(editorData.connections.values()).toEqual([
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
