import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { NodeData } from '$lib/node/data/NodeData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetAutoConnectionInputCommand } from './SetAutoConnectionInputCommand';

test('SetAutoConnectionInputCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2', isInputAutoConnectedMap: { key1: true } } as unknown as NodeData,
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new SetAutoConnectionInputCommand(
		mockCommandData({ inputPath: { nodeId: 'node2', inputKey: 'key1' }, value: false }),
	);

	command.execute(graphRegistry);

	expect(graphRegistry.nodes.get('node2').unconnectedInputValues.key1).toBe(false);

	command.undo(graphRegistry);

	expect(graphRegistry.nodes.get('node2').unconnectedInputValues.key1).toBe(true);
});
