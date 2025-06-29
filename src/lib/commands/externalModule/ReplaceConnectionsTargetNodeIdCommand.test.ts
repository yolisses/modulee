import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { ReplaceConnectionsTargetNodeIdCommand } from './ReplaceConnectionsTargetNodeIdCommand';

test('ReplaceConnectionsTargetNodeIdCommand', () => {
	const graphRegistry = {
		connections: ById.fromItems([
			{ id: 'connection1', targetNodeId: 'node1' },
			{ id: 'connection2', targetNodeId: 'node2' },
			{ id: 'connection3', targetNodeId: 'node1' },
		]),
	} as GraphRegistry;

	const command = new ReplaceConnectionsTargetNodeIdCommand(
		mockCommandData({
			newTargetId: 'node3',
			previousTargetId: 'node1',
		}),
	);

	command.execute(graphRegistry);

	expect(graphRegistry.connections.get('connection1').targetNodeId).toBe('node3');
	expect(graphRegistry.connections.get('connection2').targetNodeId).toBe('node2');
	expect(graphRegistry.connections.get('connection3').targetNodeId).toBe('node3');

	command.undo();

	expect(graphRegistry.connections.get('connection1').targetNodeId).toBe('node1');
	expect(graphRegistry.connections.get('connection2').targetNodeId).toBe('node2');
	expect(graphRegistry.connections.get('connection3').targetNodeId).toBe('node1');
});
