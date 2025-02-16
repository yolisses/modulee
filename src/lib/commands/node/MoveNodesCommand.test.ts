import type { GraphData } from '$lib/data/GraphData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { MoveNodesCommand } from './MoveNodesCommand';

test('MoveNodesCommand', () => {
	const graphData = {
		nodes: ById.fromItems([
			{ id: 'node1', position: { x: 1, y: 1 } },
			{ id: 'node2', position: { x: 2, y: 2 } },
			{ id: 'node3', position: { x: 3, y: 3 } },
		]),
	} as GraphData;

	const command = new MoveNodesCommand(
		mockCommandData({
			delta: { x: 4, y: 4 },
			nodeIds: ['node2', 'node3'],
		}),
	);
	command.execute(graphData);

	expect(graphData.nodes.get('node2').position).toEqual({ x: 6, y: 6 });
	expect(graphData.nodes.get('node3').position).toEqual({ x: 7, y: 7 });

	command.undo(graphData);

	expect(graphData.nodes.get('node2').position).toEqual({ x: 2, y: 2 });
	expect(graphData.nodes.get('node3').position).toEqual({ x: 3, y: 3 });
});
