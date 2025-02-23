import type { GraphData } from '$lib/data/GraphData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RenameGroupCommand } from './RenameGroupCommand';

test('RenameGroupCommand', () => {
	const graphData = {
		groups: ById.fromItems([{ id: 'group1' }, { id: 'group2', name: 'name1' }, { id: 'group3' }]),
	} as GraphData;

	const commandDetails = { groupId: 'group2', name: 'name2' };
	const command = new RenameGroupCommand(mockCommandData(commandDetails));
	command.execute(graphData);

	expect(graphData.groups.get('group2').name).toEqual('name2');

	command.undo(graphData);

	expect(graphData.groups.get('group2').name).toEqual('name1');
});
