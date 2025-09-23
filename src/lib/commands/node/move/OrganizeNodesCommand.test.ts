import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { VectorData } from '$lib/node/actionCommands/VectorData';
import type { NodeData } from '$lib/node/data/NodeData';
import type { NodeDataBase } from '$lib/node/data/NodeDataBase';
import { expect, test } from 'vitest';
import { mockCommandData } from '../../test/mockNodeData';
import { OrganizeNodesCommand } from './OrganizeNodesCommand';

function getPositionsById(nodesData: NodeData[]) {
	const positions = new Map<string, VectorData>();
	nodesData.forEach((nodeData) => {
		const { id, position } = nodeData;
		positions.set(id, position);
	});
	return positions;
}

test('c', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{
				id: 'node1',
				type: 'TriangleWaveNode',
				internalModuleId: 'internalModuleId1',
				position: { x: 1, y: 4 },
			},
			{
				id: 'node2',
				type: 'TriangleWaveNode',
				internalModuleId: 'internalModuleId1',
				position: { x: 2, y: 5 },
			},
			{
				id: 'node3',
				type: 'TriangleWaveNode',
				internalModuleId: 'internalModuleId1',
				position: { x: 3, y: 6 },
			},
		] as NodeDataBase[]),
		connections: ById.fromItems([
			{
				id: 'connection1',
				inputPath: { nodeId: 'node2', inputKey: 'phase' },
				targetNodeId: 'node1',
			},
		]),
	} as GraphRegistry;

	const command = new OrganizeNodesCommand(mockCommandData({}));
	command.execute(graphRegistry);

	expect(getPositionsById(graphRegistry.nodes.values())).toEqual(
		new Map([
			['node1', { x: -7, y: 3 }],
			['node2', { x: -0, y: 3 }],
			['node3', { x: -0, y: 0 }],
		]),
	);

	command.undo(graphRegistry);

	expect(getPositionsById(graphRegistry.nodes.values())).toEqual(
		new Map([
			['node1', { x: 1, y: 4 }],
			['node2', { x: 2, y: 5 }],
			['node3', { x: 3, y: 6 }],
		]),
	);
});
