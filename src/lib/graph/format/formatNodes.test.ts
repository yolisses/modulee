import { Vector } from 'nodes-editor';
import { describe, expect, test } from 'vitest';
import type { FormatingNode } from './FormatingNode';
import { formatNodes } from './formatNodes';

function getResult(map: Map<FormatingNode, Vector>) {
	return [...map.entries()].map(([key, value]) => {
		return [key.id, [value.x, value.y]];
	});
}

describe('formatNodes', () => {
	const nodeWidth = 1;

	test('zero nodes', () => {
		const nodes: FormatingNode[] = [];
		const result = getResult(formatNodes(nodes, nodeWidth, 0));
		expect(result).toEqual([]);
	});

	test('one node', () => {
		const nodes: FormatingNode[] = [{ id: 'node1', height: 1, inputs: [] }];
		const result = getResult(formatNodes(nodes, nodeWidth, 0));
		expect(result).toEqual([['node1', [-0, 0]]]);
	});

	test('two separate nodes', () => {
		const nodes: FormatingNode[] = [
			{ id: 'node1', height: 1, inputs: [] },
			{ id: 'node2', height: 1, inputs: [] },
		];
		const result = getResult(formatNodes(nodes, nodeWidth, 0));
		expect(result).toEqual([
			['node2', [-0, 0]],
			['node1', [-0, 1]],
		]);
	});

	test('two connected nodes', () => {
		const nodes: FormatingNode[] = [
			{ id: 'node1', height: 1, inputs: [] },
			{ id: 'node2', height: 1, inputs: ['node1'] },
		];
		const result = getResult(formatNodes(nodes, nodeWidth, 0));
		expect(result).toEqual([
			['node2', [-0, 0]],
			['node1', [-1, 0]],
		]);
	});

	test('graph with branch', () => {
		const nodes: FormatingNode[] = [
			{ id: 'node1', height: 1, inputs: [] },
			{ id: 'node2', height: 1, inputs: ['node1'] },
			{ id: 'node3', height: 1, inputs: ['node1'] },
			{ id: 'node4', height: 1, inputs: ['node2', 'node3'] },
		];
		const result = getResult(formatNodes(nodes, nodeWidth, 0));
		expect(result).toEqual([
			['node4', [-0, 0]],
			['node2', [-1, 0]],
			['node1', [-2, 0]],
			['node3', [-1, 1]],
		]);
	});
});
