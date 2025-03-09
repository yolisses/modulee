import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RemoveNodeCommand } from './RemoveNodeCommand';

test('RemoveNodeCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	} as GraphRegistry;

	const commandDetails = { nodeId: 'node2' };
	const command = new RemoveNodeCommand(mockCommandData(commandDetails));
	command.execute(graphRegistry);

	expect(graphRegistry.nodes).toEqual(ById.fromItems([{ id: 'node1' }, { id: 'node3' }]));

	command.undo(graphRegistry);

	expect(graphRegistry.nodes).toEqual(
		ById.fromItems([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	);
});
