import { Vector } from 'nodes-editor';
import { describe, expect, test } from 'vitest';
import type { FormatingNode } from './FormatingNode';
import { formatNodes } from './formatNodes';

describe('formatNodes', () => {
	const xStep = 1;
	const getNextY = () => 1;

	test('zero nodes', () => {
		const nodes: FormatingNode[] = [];
		const positions = formatNodes(nodes, getNextY, xStep);
		expect(positions).toEqual([]);
	});

	test('one node', () => {
		const nodes: FormatingNode[] = [{ id: 'node1', inputs: [] }];
		const positions = formatNodes(nodes, getNextY, xStep);
		expect(positions).toEqual([new Vector(0, 0)]);
	});

	test('two separate nodes', () => {
		const nodes: FormatingNode[] = [
			{ id: 'node1', inputs: [] },
			{ id: 'node2', inputs: [] },
		];
		const positions = formatNodes(nodes, getNextY, xStep);
		expect(positions).toEqual([new Vector(0, 0), new Vector(0, 1)]);
	});

	test.only('two connected nodes', () => {
		const nodes: FormatingNode[] = [
			{ id: 'node1', inputs: [] },
			{ id: 'node2', inputs: ['node1'] },
		];
		const positions = formatNodes(nodes, getNextY, xStep);
		expect(positions).toEqual([new Vector(0, 0), new Vector(1, 0)]);
	});
});
