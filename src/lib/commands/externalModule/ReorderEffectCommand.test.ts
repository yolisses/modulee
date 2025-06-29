import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { ReorderEffectCommand } from './ReorderEffectCommand';

test('ReorderEffectCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2' },
			{ id: 'node3' },
			{ id: 'node4' },
			{ id: 'node5' },
		]),
		connections: ById.fromItems([
			{ id: 'connection1', targetNodeId: 'node1', inputPath: { nodeId: 'node2' } },
			{ id: 'connection2', targetNodeId: 'node2', inputPath: { nodeId: 'node3' } },
			{ id: 'connection3', targetNodeId: 'node3', inputPath: { nodeId: 'node4' } },
			{ id: 'connection4', targetNodeId: 'node4', inputPath: { nodeId: 'node5' } },
		]),
	} as GraphRegistry;

	const command = new ReorderEffectCommand(mockCommandData({ moduleNodeId: 'node2' }));

	command.execute(graphRegistry);

	expect(graphRegistry.connections.get('connection1').targetNodeId).toBe('node1');
	expect(graphRegistry.connections.get('connection4').targetNodeId).toBe('node2');
});
