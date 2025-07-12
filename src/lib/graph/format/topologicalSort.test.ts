import { describe, expect, test } from 'vitest';
import type { Node } from './Node';
import { topologicalSort } from './topologicalSort';

describe('topologicalSort', () => {
	test('zero nodes', () => {
		const nodes: Node[] = [];
		const result = topologicalSort(nodes);
		expect(result).toEqual([]);
	});

	test('single node', () => {
		const nodes: Node[] = [{ id: 'node1', inputs: [], isDelay: false }];
		const result = topologicalSort(nodes);
		expect(result).toEqual(['node1']);
	});

	test('linear graph', () => {
		const nodes: Node[] = [
			{ id: 'node3', inputs: ['node2'], isDelay: false },
			{ id: 'node1', inputs: [], isDelay: false },
			{ id: 'node2', inputs: ['node1'], isDelay: false },
		];
		const result = topologicalSort(nodes);
		expect(result).toEqual(['node1', 'node2', 'node3']);
	});

	test('graph with branch', () => {
		const nodes: Node[] = [
			{ id: 'node2', inputs: ['node1'], isDelay: false },
			{ id: 'node4', inputs: ['node2', 'node3'], isDelay: false },
			{ id: 'node3', inputs: ['node1'], isDelay: false },
			{ id: 'node1', inputs: [], isDelay: false },
		];
		const result = topologicalSort(nodes);
		expect(result).toEqual(['node1', 'node2', 'node3', 'node4']);
	});
});
