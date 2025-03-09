import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RemoveGroupCommand } from './RemoveGroupCommand';

test('RemoveGroupCommand', () => {
	const graphData = {
		groups: ById.fromItems([{ id: 'group1' }, { id: 'group2' }, { id: 'group3' }]),
	} as GraphRegistry;

	const commandDetails = { groupId: 'group2' };
	const command = new RemoveGroupCommand(mockCommandData(commandDetails));
	command.execute(graphData);

	expect(graphData.groups).toEqual(ById.fromItems([{ id: 'group1' }, { id: 'group3' }]));

	command.undo(graphData);

	expect(graphData.groups).toEqual(
		ById.fromItems([{ id: 'group1' }, { id: 'group2' }, { id: 'group3' }]),
	);
});
