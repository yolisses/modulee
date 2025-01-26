import type { NodeData } from '$lib/data/NodeData.js';
import { expect, test } from 'vitest';
import { findInputDataInNodesData } from './findInputDataInNodesData.js';

test('findInputDataInNodesData', () => {
	const nodesData = [
		{ inputs: [{ id: '1', name: 'name1' }] },
		{ inputs: [{ id: '2', name: 'name2' }] },
		{ inputs: [{ id: '3', name: 'name3' }] },
	] as NodeData[];

	const input2 = findInputDataInNodesData('2', nodesData);
	expect(input2).toEqual({ id: '2', name: 'name2' });
});

test('findInputDataInNodesData with missing input', () => {
	const nodesData = [
		{ inputs: [{ id: '1', name: 'name1' }] },
		{ inputs: [{ id: '3', name: 'name3' }] },
	] as NodeData[];

	expect(() => {
		findInputDataInNodesData('2', nodesData);
	}).toThrow();
});
