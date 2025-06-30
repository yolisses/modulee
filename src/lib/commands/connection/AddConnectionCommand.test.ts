import type { ConnectionData } from '$lib/connection/ConnectionData';
import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { AddConnectionCommand } from './AddConnectionCommand';

test('AddConnectionCommand', () => {
	const graphRegistry = {
		connections: ById.fromItems([{ id: 'connection1' }, { id: 'connection2' }]),
	} as GraphRegistry;

	const command = new AddConnectionCommand(
		mockCommandData({ connection: { id: 'connection3' } as ConnectionData }),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.connections.values()).toEqual([
		{ id: 'connection1' },
		{ id: 'connection2' },
		{ id: 'connection3' },
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.connections.values()).toEqual([
		{ id: 'connection1' },
		{ id: 'connection2' },
	]);
});
