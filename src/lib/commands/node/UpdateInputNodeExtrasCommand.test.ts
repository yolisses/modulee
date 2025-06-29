import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputNodeData } from '$lib/node/data/variants/InputNodeData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { UpdateInputNodeExtrasCommand } from './UpdateInputNodeExtrasCommand';

test('UpdateInputNodeExtrasCommand', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2', type: 'InputNode', extras: { min: 1, max: 3, default: 2, name: 'test1' } },
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new UpdateInputNodeExtrasCommand(
		mockCommandData({ nodeId: 'node2', extras: { min: 4, default: 5 } }),
	);

	command.execute(graphRegistry);

	expect((graphRegistry.nodes.get('node2') as InputNodeData).extras.min).toBe(4);
	expect((graphRegistry.nodes.get('node2') as InputNodeData).extras.max).toBe(3);
	expect((graphRegistry.nodes.get('node2') as InputNodeData).extras.default).toBe(5);
	expect((graphRegistry.nodes.get('node2') as InputNodeData).extras.name).toBe('test1');

	command.undo(graphRegistry);

	expect((graphRegistry.nodes.get('node2') as InputNodeData).extras.min).toBe(1);
	expect((graphRegistry.nodes.get('node2') as InputNodeData).extras.max).toBe(3);
	expect((graphRegistry.nodes.get('node2') as InputNodeData).extras.default).toBe(2);
	expect((graphRegistry.nodes.get('node2') as InputNodeData).extras.name).toBe('test1');
});

test('UpdateInputNodeExtrasCommand with wrong type', () => {
	const graphRegistry = {
		nodes: ById.fromItems([
			{ id: 'node1' },
			{ id: 'node2', type: 'ConstantNode', extras: { value: 1 } },
			{ id: 'node3' },
		]),
	} as GraphRegistry;
	const command = new UpdateInputNodeExtrasCommand(
		mockCommandData({ nodeId: 'node3', extras: { min: 4, default: 5 } }),
	);

	expect(() => {
		command.execute(graphRegistry);
	}).toThrow();
});
