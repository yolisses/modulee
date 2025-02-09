import type { ConnectionData } from '$lib/data/ConnectionData';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { SetConnection } from './SetConnection';
import { mockCommandData } from './test/mockNodeData';

test('SetConnection without remotion', () => {
	const editorData = { connections: [] as ConnectionData[] } as EditorData;

	const command = new SetConnection(
		mockCommandData({
			connection: {
				nodeId: 'node1',
				id: 'connection1',
				inputName: 'input1',
				targetNodeId: 'node2',
			},
		}),
	);

	command.execute(editorData);

	expect(editorData.connections).toEqual([
		{
			nodeId: 'node1',
			id: 'connection1',
			inputName: 'input1',
			targetNodeId: 'node2',
		},
	]);

	command.undo(editorData);

	expect(editorData.connections).toEqual([]);
});

test('SetConnection with remotion', () => {
	const editorData = {
		connections: [
			{
				nodeId: 'node1',
				id: 'connection1',
				inputName: 'input1',
				targetNodeId: 'node2',
			},
		],
	} as EditorData;

	const command = new SetConnection(
		mockCommandData({
			connection: {
				nodeId: 'node1',
				id: 'connection2',
				inputName: 'input1',
				targetNodeId: 'node3',
			},
		}),
	);

	command.execute(editorData);

	expect(editorData.connections).toEqual([
		{
			nodeId: 'node1',
			id: 'connection2',
			inputName: 'input1',
			targetNodeId: 'node3',
		},
	]);

	command.undo(editorData);

	expect(editorData.connections).toEqual([
		{
			nodeId: 'node1',
			id: 'connection1',
			inputName: 'input1',
			targetNodeId: 'node2',
		},
	]);
});
