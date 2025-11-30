import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../../test/mockNodeData';
import { AddConnectedNodeCommand } from './AddConnectedNodeCommand';

test('AddConnectedNodeCommand', () => {
	const graphRegistry = {
		connections: new ById(),
		nodes: ById.fromItems([{ id: 'node1' }]),
	} as GraphRegistry;

	const command = new AddConnectedNodeCommand(
		mockCommandData({
			node: { id: 'node2' } as NodeData,
			inputParams: {
				connectionId: 'connection2',
				inputPath: { nodeId: 'node1', inputKey: 'someInput' },
			},
		}),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);
	expect(graphRegistry.connections.values()).toEqual([
		{
			id: 'connection2',
			targetNodeId: 'node2',
			inputPath: { nodeId: 'node1', inputKey: 'someInput' },
		},
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.nodes.values()).toEqual([{ id: 'node1' }]);
	expect(graphRegistry.connections.values()).toEqual([]);
});
