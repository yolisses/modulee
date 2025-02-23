import type { GraphData } from '$lib/data/GraphData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { RemoveGroupCommand } from './RemoveGroupCommand';
import { mockCommandData } from '../test/mockNodeData';

test('RemoveGroupCommand', () => {
	const graphData = {
		groups: ById.fromItems([{ id: 'group1' }, { id: 'group2' }, { id: 'group3' }]),
	} as GraphData;

	const commandDetails = { groupId: 'group2' };
	const command = new RemoveGroupCommand(mockCommandData(commandDetails));
	command.execute(graphData);

	expect(graphData.groups).toEqual(ById.fromItems([{ id: 'group1' }, { id: 'group3' }]));

	command.undo(graphData);

	expect(graphData.groups).toEqual(
		ById.fromItems([{ id: 'group1' }, { id: 'group2' }, { id: 'group3' }]),
	);
});
