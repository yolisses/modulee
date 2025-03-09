import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RemoveNodesCommand } from './RemoveNodesCommand';

test('RemoveNodesCommand', () => {
	const graphData = {
		nodes: ById.fromItems([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	} as GraphRegistry;

	const command = new RemoveNodesCommand(
		mockCommandData({
			nodeIds: ['node1', 'node3'],
		}),
	);
	command.execute(graphData);

	expect(graphData.nodes).toEqual(ById.fromItems([{ id: 'node2' }]));

	command.undo(graphData);

	expect(graphData.nodes).toEqual(
		ById.fromItems([{ id: 'node2' }, { id: 'node1' }, { id: 'node3' }]),
	);
});
