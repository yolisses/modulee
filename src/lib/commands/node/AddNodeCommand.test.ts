import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { AddNodeCommand } from './AddNodeCommand';

test('AddNodeCommand', () => {
	const graphData = {
		nodes: ById.fromItems([{ id: 'node1' }, { id: 'node2' }]),
	} as GraphRegistry;

	const command = new AddNodeCommand(mockCommandData({ node: { id: 'node3' } as NodeData }));
	command.execute(graphData);

	expect(graphData.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]);

	command.undo(graphData);

	expect(graphData.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);
});
