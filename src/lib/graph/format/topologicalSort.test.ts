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

	test('cycle with delay - rotation 1', () => {
		const nodes: Node[] = [
			{ id: 'B', inputs: ['A'], isDelay: true },
			{ id: 'C', inputs: ['B'], isDelay: false },
			{ id: 'A', inputs: ['C'], isDelay: false },
		];

		const result = topologicalSort(nodes);
		expect(result).toEqual(['B', 'C', 'A']);
	});

	test('cycle with delay - rotation 2', () => {
		const nodes: Node[] = [
			{ id: 'A', inputs: ['C'], isDelay: false },
			{ id: 'B', inputs: ['A'], isDelay: true },
			{ id: 'C', inputs: ['B'], isDelay: false },
		];

		const result = topologicalSort(nodes);
		expect(result).toEqual(['B', 'C', 'A']);
	});

	test('cycle with delay - rotation 3', () => {
		const nodes: Node[] = [
			{ id: 'A', inputs: ['C'], isDelay: false },
			{ id: 'C', inputs: ['B'], isDelay: false },
			{ id: 'B', inputs: ['A'], isDelay: true },
		];

		const result = topologicalSort(nodes);
		expect(result).toEqual(['B', 'C', 'A']);
	});

	test('big cycle with delay - rotation 1', () => {
		const nodes: Node[] = [
			{ id: 'A', inputs: ['E'], isDelay: false },
			{ id: 'B', inputs: ['A'], isDelay: true },
			{ id: 'C', inputs: ['B'], isDelay: false },
			{ id: 'D', inputs: ['C'], isDelay: false },
			{ id: 'E', inputs: ['D'], isDelay: false },
		];

		const result = topologicalSort(nodes);
		expect(result).toEqual(['B', 'C', 'D', 'E', 'A']);
	});

	test('big cycle with delay - rotation 2', () => {
		const nodes: Node[] = [
			{ id: 'E', inputs: ['D'], isDelay: false },
			{ id: 'A', inputs: ['E'], isDelay: false },
			{ id: 'C', inputs: ['B'], isDelay: false },
			{ id: 'B', inputs: ['A'], isDelay: true },
			{ id: 'D', inputs: ['C'], isDelay: false },
		];

		const result = topologicalSort(nodes);
		expect(result).toEqual(['B', 'C', 'D', 'E', 'A']);
	});
});
