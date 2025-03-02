import type { GraphData } from '$lib/data/GraphData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { RemoveNodeCommandV2 } from './RemoveNodeCommandV2';

test('RemoveNodeCommandV2', () => {
	const graphData = {
		nodes: ById.fromItems([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	} as GraphData;

	const command = new RemoveNodeCommandV2({ graphDataContext: { graphData } }, { nodeId: 'node2' });
	command.execute();

	expect(graphData.nodes).toEqual(ById.fromItems([{ id: 'node1' }, { id: 'node3' }]));

	command.undo();

	expect(graphData.nodes).toEqual(
		ById.fromItems([{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }]),
	);
});
