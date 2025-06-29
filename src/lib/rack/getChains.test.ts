import { describe, expect, it } from 'vitest';
import { getChains } from './getChains';

type TopologicalMap = Map<string, string[]>;

describe('getChains', () => {
	it('returns empty array for empty graph', () => {
		const graph: TopologicalMap = new Map();
		expect(getChains(graph)).toEqual([]);
	});

	it('returns single chain for linear graph', () => {
		const graph: TopologicalMap = new Map([
			['A', []],
			['B', ['A']],
			['C', ['B']],
		]);
		expect(getChains(graph)).toEqual([['A', 'B', 'C']]);
	});

	it('returns separate chains for disconnected nodes', () => {
		const graph: TopologicalMap = new Map([
			['A', []],
			['B', []],
			['C', []],
		]);
		expect(getChains(graph)).toEqual([['A'], ['B'], ['C']]);
	});

	it('throws if a node has more than one input', () => {
		const graph: TopologicalMap = new Map([
			['A', []],
			['B', ['A']],
			['C', ['A', 'B']],
		]);
		expect(() => getChains(graph)).toThrow('Node with more than one input');
	});

	it('throws if input is missing in the chains', () => {
		const graph: TopologicalMap = new Map([
			['A', []],
			['B', ['X']],
		]);
		expect(() => getChains(graph)).toThrow('Input missing in the chains');
	});

	it('handles branching by creating new chains', () => {
		// A-B-C
		//   '-D
		const graph: TopologicalMap = new Map([
			['A', []],
			['B', ['A']],
			['C', ['B']],
			['D', ['B']],
		]);
		const result = getChains(graph);
		expect(result).toEqual([['A', 'B'], ['C'], ['D']]);
	});

	it('handles multiple chains with branches', () => {
		// A-C-E
		//   '-G
		// B-D-F
		const graph: TopologicalMap = new Map([
			['A', []],
			['B', []],
			['C', ['A']],
			['D', ['B']],
			['E', ['C']],
			['F', ['D']],
			['G', ['C']],
		]);
		const result = getChains(graph);
		expect(result).toEqual([['A', 'C'], ['B', 'D', 'F'], ['E'], ['G']]);
	});
});
