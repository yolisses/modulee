import type { GraphData } from '$lib/data/GraphData';
import type { NodeData } from '$lib/data/NodeData';
import { ById } from '$lib/editor/ById.svelte';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { AddNodeCommand } from './AddNodeCommand';

test('AddNodeCommand', () => {
	const graphData = {
		nodes: new ById([{ id: 'node1' }, { id: 'node2' }]),
	} as GraphData;

	const command = new AddNodeCommand(mockCommandData({ node: { id: 'node3' } as NodeData }));
	command.execute(graphData);

	expect(graphData.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]);

	command.undo(graphData);

	expect(graphData.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);
});
