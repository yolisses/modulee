import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RemoveConnectionsCommand } from './RemoveConnectionsCommand';

test('RemoveConnectionsCommand', () => {
	const graphRegistry = {
		connections: ById.fromItems([
			{ id: 'connection1' },
			{ id: 'connection2' },
			{ id: 'connection3' },
		]),
	} as GraphRegistry;

	const command = new RemoveConnectionsCommand(
		mockCommandData({
			connectionIds: ['connection1', 'connection3'],
		}),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.connections).toEqual(ById.fromItems([{ id: 'connection2' }]));

	command.undo(graphRegistry);

	expect(graphRegistry.connections).toEqual(
		ById.fromItems([{ id: 'connection2' }, { id: 'connection1' }, { id: 'connection3' }]),
	);
});
