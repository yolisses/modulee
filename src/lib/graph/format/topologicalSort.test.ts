import { describe, expect, test } from 'vitest';
import { CycleWithoutDelayError } from './CycleWithoutDelayError';
import type { Node } from './Node';
import { topologicalSort } from './topologicalSort';

describe('topologicalSort', () => {
	test('zero nodes', () => {
		const nodes: Node[] = [];
		const result = topologicalSort(nodes);
		expect(result).toEqual([]);
	});

	test('single node', () => {
		const nodes: Node[] = [{ id: 'A', inputs: [], isDelay: false }];
		const result = topologicalSort(nodes);
		expect(result).toEqual(['A']);
	});

	test('linear graph', () => {
		const nodes: Node[] = [
			{ id: 'C', inputs: ['B'], isDelay: false },
			{ id: 'A', inputs: [], isDelay: false },
			{ id: 'B', inputs: ['A'], isDelay: false },
		];
		const result = topologicalSort(nodes);
		expect(result).toEqual(['A', 'B', 'C']);
	});

	test('graph with branch', () => {
		const nodes: Node[] = [
			{ id: 'B', inputs: ['A'], isDelay: false },
			{ id: 'D', inputs: ['B', 'C'], isDelay: false },
			{ id: 'C', inputs: ['A'], isDelay: false },
			{ id: 'A', inputs: [], isDelay: false },
		];
		const result = topologicalSort(nodes);
		expect(result).toEqual(['A', 'B', 'C', 'D']);
	});

	test('cycle without delay', () => {
		const nodes: Node[] = [
			{ id: 'A', inputs: ['C'], isDelay: false },
			{ id: 'B', inputs: ['A'], isDelay: false },
			{ id: 'C', inputs: ['B'], isDelay: false },
		];

		expect(() => topologicalSort(nodes)).toThrow(CycleWithoutDelayError);
	});
});
