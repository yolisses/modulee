import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RemoveNodeCommand } from './RemoveNodeCommand';

test('RemoveNodeCommand', () => {
	const graphData = {
		nodes: ById.fromItems([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	} as GraphRegistry;

	const commandDetails = { nodeId: 'node2' };
	const command = new RemoveNodeCommand(mockCommandData(commandDetails));
	command.execute(graphData);

	expect(graphData.nodes).toEqual(ById.fromItems([{ id: 'node1' }, { id: 'node3' }]));

	command.undo(graphData);

	expect(graphData.nodes).toEqual(
		ById.fromItems([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	);
});
