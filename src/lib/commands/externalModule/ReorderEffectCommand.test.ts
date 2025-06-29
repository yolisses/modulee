import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { ReorderEffectCommand } from './ReorderEffectCommand';

test('ReorderEffectCommand', () => {
	const graphRegistry = {
		// 1<-2<-3<-4<-5
		// 1<-3<-4<-2<-5
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2' },
			{ id: 'node3' },
			{ id: 'node4' },
			{ id: 'node5' },
		]),
		connections: ById.fromItems([
			{ id: 'connection1', inputPath: { nodeId: 'node2' }, targetNodeId: 'node1' },
			{ id: 'connection2', inputPath: { nodeId: 'node3' }, targetNodeId: 'node2' },
			{ id: 'connection3', inputPath: { nodeId: 'node4' }, targetNodeId: 'node3' },
			{ id: 'connection4', inputPath: { nodeId: 'node5' }, targetNodeId: 'node4' },
		]),
	} as GraphRegistry;

	const command = new ReorderEffectCommand(
		mockCommandData({
			direction: 'back',
			moduleNodeId: 'node2',
			referenceNodeId: 'node5',
		}),
	);

	command.execute(graphRegistry);

	expect(graphRegistry.connections).toEqual(
		ById.fromItems([
			{ id: 'connection1', inputPath: { nodeId: 'node2' }, targetNodeId: 'node4' },
			{ id: 'connection2', inputPath: { nodeId: 'node3' }, targetNodeId: 'node1' },
			{ id: 'connection3', inputPath: { nodeId: 'node4' }, targetNodeId: 'node3' },
			{ id: 'connection4', inputPath: { nodeId: 'node5' }, targetNodeId: 'node2' },
		]),
	);
});
