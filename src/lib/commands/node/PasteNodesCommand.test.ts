import type { ConnectionData } from '$lib/connection/ConnectionData';
import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { PasteNodesCommand } from './PasteNodesCommand';

test('PasteNodesCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([{ id: 'node1' }, { id: 'node2' }]),
		connections: ById.fromItems([{ id: 'connection1' }]),
	} as GraphRegistry;

	const command = new PasteNodesCommand(
		mockCommandData({
			nodes: [{ id: 'node3' }, { id: 'node4' }] as NodeData[],
			connections: [{ id: 'connection2' }] as ConnectionData[],
		}),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.nodes.values()).toEqual([
		{ id: 'node1' },
		{ id: 'node2' },
		{ id: 'node3' },
		{ id: 'node4' },
	]);
	expect(graphRegistry.connections.values()).toEqual([
		{ id: 'connection1' },
		{ id: 'connection2' },
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);
	expect(graphRegistry.connections.values()).toEqual([{ id: 'connection1' }]);
});
