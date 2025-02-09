import type { NodeData } from '$lib/data/NodeData';
import { expect, test } from 'vitest';
import { findInputDataInNodesData } from './findInputDataInNodesData';

test('findInputDataInNodesData', () => {
	const nodesData = [
		{ id: 'node1', inputs: [{ name: 'input1' }] },
		{ id: 'node2', inputs: [{ name: 'input2' }, { name: 'input3' }] },
		{ id: 'node3', inputs: [{ name: 'input4' }] },
	] as NodeData[];

	const input2 = findInputDataInNodesData({ nodeId: 'node2', inputName: 'input3' }, nodesData);
	expect(input2).toEqual({ name: 'input3' });
});

test('findInputDataInNodesData with missing input', () => {
	const nodesData = [
		{ id: 'node1', inputs: [{ name: 'input1' }] },
		{ id: 'node2', inputs: [{ name: 'input2' }] },
	] as NodeData[];

	expect(() => {
		findInputDataInNodesData({ nodeId: 'node2', inputName: 'input3' }, nodesData);
	}).toThrow();
});
