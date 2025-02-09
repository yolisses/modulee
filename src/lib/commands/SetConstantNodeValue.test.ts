import type { ExtrasData } from '$lib/data/ExtrasData';
import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { SetConstantNodeValue } from './SetConstantNodeValue';
import { mockCommandData } from './test/mockNodeData';

test('SetConstantNodeValue', () => {
	const editorData = {
		nodes: new ById([
			{ id: 'node1' },
			{ id: 'node2', type: 'ConstantNode', extras: { value: 1 } as ExtrasData },
			{ id: 'node3' },
		]),
	} as EditorData;
	const command = new SetConstantNodeValue(mockCommandData({ nodeId: 'node2', value: 2 }));

	command.execute(editorData);

	expect(editorData.nodes.get('node2').extras.value).toBe(2);

	command.undo(editorData);

	expect(editorData.nodes.get('node2').extras.value).toBe(1);
});

test('SetConstantNodeValue with wrong type', () => {
	const editorData = {
		nodes: new ById([
			{ id: 'node1' },
			{ id: 'node2', type: 'ConstantNode', extras: { value: 1 } as ExtrasData },
			{ id: 'node3' },
		]),
	} as EditorData;
	const command = new SetConstantNodeValue(mockCommandData({ nodeId: 'node3', value: 2 }));

	expect(() => {
		command.execute(editorData);
	}).toThrow();
});
