import { ById } from '$lib/editor/ById.svelte';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetGroupTypeCommand } from './SetGroupTypeCommand';

test('SetGroupTypeCommand', () => {
	const editorData = {
		groups: new ById([{ id: 'group1' }, { id: 'group2', type: 'type1' }, { id: 'group3' }]),
	} as EditorData;
	const command = new SetGroupTypeCommand(mockCommandData({ groupId: 'group2', type: 'type2' }));

	command.execute(editorData);

	expect(editorData.groups.get('group2').type).toBe('type2');

	command.undo(editorData);

	expect(editorData.groups.get('group2').type).toBe('type1');
});
