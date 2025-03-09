import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { ConstantNodeData } from '$lib/data/variants/ConstantNodeData';
import { ById } from '$lib/editor/ById';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { SetConstantNodeValueCommand } from './SetConstantNodeValueCommand';

test('SetConstantNodeValueCommand', () => {
	const graphData = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2', type: 'ConstantNode', extras: { value: 1 } },
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new SetConstantNodeValueCommand(mockCommandData({ nodeId: 'node2', value: 2 }));

	command.execute(graphData);

	expect((graphData.nodes.get('node2') as ConstantNodeData).extras.value).toBe(2);

	command.undo(graphData);

	expect((graphData.nodes.get('node2') as ConstantNodeData).extras.value).toBe(1);
});

test('SetConstantNodeValueCommand with wrong type', () => {
	const graphData = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2', type: 'ConstantNode', extras: { value: 1 } },
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new SetConstantNodeValueCommand(mockCommandData({ nodeId: 'node3', value: 2 }));

	expect(() => {
		command.execute(graphData);
	}).toThrow();
});
