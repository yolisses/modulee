import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { SetInputConnectedOutput } from './SetInputConnectedOutput';
import { mockCommandData } from './test/mockNodeData';

test('SetInputConnectedOutput', () => {
	const editorData = {
		nodes: [
			{ id: 'node1', inputs: [{ name: 'input1', connectedOutputId: 'output1' }] },
			{
				id: 'node2',
				inputs: [
					{ name: 'input2', connectedOutputId: 'output2' },
					{ name: 'input3', connectedOutputId: 'output3' },
				],
			},
		],
	} as EditorData;
	const command = new SetInputConnectedOutput(
		mockCommandData({ inputPath: { nodeId: 'node2', inputName: 'input2' }, outputId: 'output4' }),
	);

	command.execute(editorData);

	expect(editorData.nodes[1].inputs[0].connectedOutputId).toBe('output4');

	command.undo(editorData);

	expect(editorData.nodes[1].inputs[0].connectedOutputId).toBe('output2');
});

test('SetInputConnectedOutput with undefined outputId', () => {
	const editorData = {
		nodes: [
			{ id: 'node1', inputs: [{ name: 'input1', connectedOutputId: 'output1' }] },
			{
				id: 'node2',
				inputs: [
					{ name: 'input2', connectedOutputId: 'output2' },
					{ name: 'input3', connectedOutputId: 'output3' },
				],
			},
		],
	} as EditorData;
	const command = new SetInputConnectedOutput(
		mockCommandData({ inputPath: { nodeId: 'node2', inputName: 'input2' } }),
	);

	command.execute(editorData);

	expect(editorData.nodes[1].inputs[0].connectedOutputId).toBe(undefined);

	command.undo(editorData);

	expect(editorData.nodes[1].inputs[0].connectedOutputId).toBe('output2');
});
