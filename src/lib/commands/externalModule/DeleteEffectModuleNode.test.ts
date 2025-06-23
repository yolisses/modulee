import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { DeleteEffectModuleNode } from './DeleteEffectModuleNode';

test('DeleteEffectModuleNode', () => {
	const graphRegistry = {
		externalModules: ById.fromItems([
			{ id: 'externalModule', graph: { nodes: [{ id: 'audioInput', type: 'AudioInputNode' }] } },
		]),
		connections: ById.fromItems([
			{
				id: 'connection1',
				targetNodeId: 'someNode1',
				inputPath: { nodeId: 'moduleNode', inputKey: 'audioInput' },
			},
			{
				id: 'connection2',
				targetNodeId: 'moduleNode',
				inputPath: { nodeId: 'someNode2', inputKey: 'someInput' },
			},
		]),
		nodes: ById.fromItems([
			{
				id: 'moduleNode',
				type: 'ModuleNode',
				extras: { moduleReference: { type: 'external', id: 'externalModule' } },
			},
		]),
	} as GraphRegistry;

	const command = new DeleteEffectModuleNode(mockCommandData({ moduleNodeId: 'moduleNode' }));

	command.execute(graphRegistry);

	// 1. Set connections to the module node to its audio input target (if any)
	expect(graphRegistry.connections.get('connection2').targetNodeId).toBe('someNode1');

	// 2. Delete the effect module node
	expect(graphRegistry.nodes.containsId('moduleNode')).toBeFalsy();
});
