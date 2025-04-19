import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { removeMissingNodeReferences } from './removeMissingNodeReferences';

test('removeMissingNodeReferences', () => {
	const graphRegistry = {
		nodes: ById.fromItems([{ id: 'node1' }, { id: 'node3' }]),
		connections: ById.fromItems([
			{ id: 'connection1', targetNodeId: 'node1' },
			{ id: 'connection2', targetNodeId: 'node2' },
			{ id: 'connection3', targetNodeId: 'node3' },
		]),
	} as GraphRegistry;

	removeMissingNodeReferences(graphRegistry);

	expect(graphRegistry.connections.values()).toEqual([
		{ id: 'connection1', targetNodeId: 'node1' },
		{ id: 'connection3', targetNodeId: 'node3' },
	]);
});
