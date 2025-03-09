import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { GroupData } from '$lib/data/GroupData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { AddGroupCommand } from './AddGroupCommand';

test('AddGroupCommand', () => {
	const graphData = {
		groups: ById.fromItems([{ id: 'group1' }]),
	} as GraphRegistry;

	const command = new AddGroupCommand(mockCommandData({ group: { id: 'group2' } as GroupData }));
	command.execute(graphData);

	expect(graphData.groups.values()).toEqual([{ id: 'group1' }, { id: 'group2' }]);

	command.undo(graphData);

	expect(graphData.groups.values()).toEqual([{ id: 'group1' }]);
});
