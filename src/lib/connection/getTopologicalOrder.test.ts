import { describe, expect, it } from 'vitest';
import { getTopologicalOrder } from './getTopologicalOrder';

describe('getTopologicalOrder', () => {
	it('returns an empty array for an empty graph', () => {
		const graph = new Map<string, string[]>();
		expect(getTopologicalOrder(graph)).toEqual([]);
	});

	it('returns a single node for a graph with one node and no edges', () => {
		const graph = new Map<string, string[]>([['A', []]]);
		expect(getTopologicalOrder(graph)).toEqual(['A']);
	});

	it('sorts a simple linear dependency', () => {
		const graph = new Map<string, string[]>([
			['B', ['C']],
			['A', ['B']],
			['C', []],
		]);
		expect(getTopologicalOrder(graph)).toEqual(['C', 'B', 'A']);
	});

	it('sorts a graph with branching dependencies', () => {
		const graph = new Map<string, string[]>([
			['B', ['D']],
			['A', ['B', 'C']],
			['D', []],
			['C', ['D']],
		]);
		expect(getTopologicalOrder(graph)).toEqual(['D', 'B', 'C', 'A']);
	});

	it('handles disconnected graphs', () => {
		const graph = new Map<string, string[]>([
			['B', []],
			['C', ['D']],
			['A', ['B']],
			['D', []],
		]);
		expect(getTopologicalOrder(graph)).toEqual(['B', 'D', 'C', 'A']);
	});

	it('handles nodes with no dependencies', () => {
		const graph = new Map<string, string[]>([
			['A', []],
			['B', []],
			['C', []],
		]);
		expect(getTopologicalOrder(graph)).toEqual(['A', 'B', 'C']);
	});

	it('does not revisit nodes', () => {
		const graph = new Map<string, string[]>([
			['A', ['B']],
			['B', ['C']],
			['C', ['A']],
		]);
		expect(getTopologicalOrder(graph)).toEqual(['C', 'B', 'A']);
	});
});
