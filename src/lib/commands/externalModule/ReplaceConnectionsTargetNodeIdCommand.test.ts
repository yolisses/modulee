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
			{ id: 'connection3', targetNodeId: 'node3' },
		]),
	} as GraphRegistry;

	const command = new ReplaceConnectionsTargetNodeIdCommand(
		mockCommandData({
			targetId: 'node4',
			connectionIds: ['connection1', 'connection3'],
		}),
	);

	command.execute(graphRegistry);

	expect(graphRegistry.connections.get('connection1').targetNodeId).toBe('node4');
	expect(graphRegistry.connections.get('connection2').targetNodeId).toBe('node2');
	expect(graphRegistry.connections.get('connection3').targetNodeId).toBe('node4');

	command.undo(graphRegistry);

	expect(graphRegistry.connections.get('connection1').targetNodeId).toBe('node1');
	expect(graphRegistry.connections.get('connection2').targetNodeId).toBe('node2');
	expect(graphRegistry.connections.get('connection3').targetNodeId).toBe('node3');
});
