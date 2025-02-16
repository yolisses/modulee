import type { GraphData } from '$lib/data/GraphData';
import { ById } from '$lib/editor/ById.svelte';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RemoveNodeCommand } from './RemoveNodeCommand';

test('RemoveNodeCommand', () => {
	const graphData = {
		nodes: new ById([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	} as GraphData;

	const commandDetails = { nodeId: 'node2' };
	const command = new RemoveNodeCommand(mockCommandData(commandDetails));
	command.execute(graphData);

	expect(graphData.nodes).toEqual(new ById([{ id: 'node1' }, { id: 'node3' }]));

	command.undo(graphData);

	expect(graphData.nodes).toEqual(new ById([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]));
});
