import type { EditorData } from '$lib/editor/EditorData.js';
import { expect, test } from 'vitest';
import { SetInputConnectedOutput } from './SetInputConnectedOutput.js';
import { mockCommandData } from './test/mockNodeData.js';

test('SetInputConnectedOutput', () => {
	const editorData = {
		nodes: [
			{ inputs: [{ id: 'input1', connectedOutputId: 'output1' }] },
			{
				inputs: [
					{ id: 'input2', connectedOutputId: 'output2' },
					{ id: 'input3', connectedOutputId: 'output3' },
				],
			},
		],
	} as EditorData;
	const command = new SetInputConnectedOutput(
		mockCommandData({ inputId: 'input2', outputId: 'output4' }),
	);

	command.execute(editorData);

	expect(editorData.nodes[1].inputs[0].connectedOutputId).toBe('output4');

	command.undo(editorData);

	expect(editorData.nodes[1].inputs[0].connectedOutputId).toBe('output2');
});

test('SetInputConnectedOutput with undefined outputId', () => {
	const editorData = {
		nodes: [
			{ inputs: [{ id: 'input1', connectedOutputId: 'output1' }] },
			{
				inputs: [
					{ id: 'input2', connectedOutputId: 'output2' },
					{ id: 'input3', connectedOutputId: 'output3' },
				],
			},
		],
	} as EditorData;
	const command = new SetInputConnectedOutput(mockCommandData({ inputId: 'input2' }));

	command.execute(editorData);

	expect(editorData.nodes[1].inputs[0].connectedOutputId).toBe(undefined);

	command.undo(editorData);

	expect(editorData.nodes[1].inputs[0].connectedOutputId).toBe('output2');
});
