import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { RenameNodesCommand } from './RenameNodesCommand';

test('RenameNodesCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1', name: undefined },
			{ id: 'node2', name: 'node2' },
			{ id: 'node3', name: 'node3' },
		]),
	} as GraphRegistry;

	const command = new RenameNodesCommand(
		mockCommandData({
			nodesId: ['node1', 'node2'],
			name: 'renamedNode',
		}),
	);
	command.execute(graphRegistry);

	expect(graphRegistry.nodes.values()).toEqual([
		{ id: 'node1', name: 'renamedNode' },
		{ id: 'node2', name: 'renamedNode' },
		{ id: 'node3', name: 'node3' },
	]);

	command.undo(graphRegistry);

	expect(graphRegistry.nodes.values()).toEqual([
		{ id: 'node1', name: undefined },
		{ id: 'node2', name: 'node2' },
		{ id: 'node3', name: 'node3' },
	]);
});
