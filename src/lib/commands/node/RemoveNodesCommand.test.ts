import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RemoveNodesCommand } from './RemoveNodesCommand';

test('RemoveNodesCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	} as GraphRegistry;

	const command = new RemoveNodesCommand(
		mockCommandData({
			nodeIds: ['node1', 'node3'],
		}),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.nodes).toEqual(ById.fromItems([{ id: 'node2' }]));

	command.undo(graphRegistry);

	expect(graphRegistry.nodes).toEqual(
		ById.fromItems([{ id: 'node2' }, { id: 'node1' }, { id: 'node3' }]),
	);
});
