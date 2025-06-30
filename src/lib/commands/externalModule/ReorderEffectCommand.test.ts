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
			{ id: 'node1', type: 'ModuleNode' },
			{ id: 'node2', type: 'ModuleNode' },
			{ id: 'node3', type: 'ModuleNode' },
			{ id: 'node4', type: 'ModuleNode' },
			{ id: 'node5', type: 'ModuleNode' },
		]),
		connections: ById.fromItems([
			{
				id: 'connection1',
				targetNodeId: 'node1',
				inputPath: { nodeId: 'node2', inputKey: 'audio' },
			},
			{
				id: 'connection2',
				targetNodeId: 'node2',
				inputPath: { nodeId: 'node3', inputKey: 'audio' },
			},
			{
				id: 'connection3',
				targetNodeId: 'node3',
				inputPath: { nodeId: 'node4', inputKey: 'audio' },
			},
			{
				id: 'connection4',
				targetNodeId: 'node4',
				inputPath: { nodeId: 'node5', inputKey: 'audio' },
			},
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
			{
				id: 'connection1',
				targetNodeId: 'node4',
				inputPath: { nodeId: 'node2', inputKey: 'audio' },
			},
			{
				id: 'connection2',
				targetNodeId: 'node1',
				inputPath: { nodeId: 'node3', inputKey: 'audio' },
			},
			{
				id: 'connection3',
				targetNodeId: 'node3',
				inputPath: { nodeId: 'node4', inputKey: 'audio' },
			},
			{
				id: 'connection4',
				targetNodeId: 'node2',
				inputPath: { nodeId: 'node5', inputKey: 'audio' },
			},
		]),
	);

	command.undo(graphRegistry);

	expect(graphRegistry.connections).toEqual(
		ById.fromItems([
			{
				id: 'connection1',
				targetNodeId: 'node1',
				inputPath: { nodeId: 'node2', inputKey: 'audio' },
			},
			{
				id: 'connection2',
				targetNodeId: 'node2',
				inputPath: { nodeId: 'node3', inputKey: 'audio' },
			},
			{
				id: 'connection3',
				targetNodeId: 'node3',
				inputPath: { nodeId: 'node4', inputKey: 'audio' },
			},
			{
				id: 'connection4',
				targetNodeId: 'node4',
				inputPath: { nodeId: 'node5', inputKey: 'audio' },
			},
		]),
	);
});
