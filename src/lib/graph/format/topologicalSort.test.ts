import { describe, expect, test } from 'vitest';
import { topologicalSort } from './topologicalSort';

interface Node {
	id: string;
	isDelay: boolean;
	inputs: string[];
}

describe('topologicalSort', () => {
	test('should sort a simple acyclic graph', () => {
		// A─B─D
		// └─C─┘
		const nodes: Node[] = [
			{ id: 'A', isDelay: false, inputs: [] },
			{ id: 'B', isDelay: false, inputs: ['A'] },
			{ id: 'C', isDelay: false, inputs: ['A'] },
			{ id: 'D', isDelay: false, inputs: ['B', 'C'] },
		];
		const result = topologicalSort(nodes);
		expect(result).toEqual(['A', 'B', 'C', 'D']);
	});

	test('should handle a cycle with a delay node', () => {
		// ┌A─B─C
		// └────┘
		const nodes: Node[] = [
			{ id: 'A', isDelay: false, inputs: ['C'] },
			{ id: 'B', isDelay: true, inputs: ['A'] },
			{ id: 'C', isDelay: false, inputs: ['B'] },
		];
		const result = topologicalSort(nodes);
		expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C']));
	});

	test('should return null for a cycle without delay nodes', () => {
		// ┌A─B
		// └──┘
		const nodes: Node[] = [
			{ id: 'A', isDelay: false, inputs: ['B'] },
			{ id: 'B', isDelay: false, inputs: ['A'] },
		];
		const result = topologicalSort(nodes);
		expect(result).toBeNull();
	});

	test('should handle an empty graph', () => {
		const nodes: Node[] = [];
		const result = topologicalSort(nodes);
		expect(result).toEqual([]);
	});

	test('should handle a single node with no inputs', () => {
		// A
		const nodes: Node[] = [{ id: 'A', isDelay: false, inputs: [] }];
		const result = topologicalSort(nodes);
		expect(result).toEqual(['A']);
	});

	test('should handle disconnected graph', () => {
		// A─C
		// B
		const nodes: Node[] = [
			{ id: 'A', isDelay: false, inputs: [] },
			{ id: 'B', isDelay: false, inputs: [] },
			{ id: 'C', isDelay: false, inputs: ['A'] },
		];
		const result = topologicalSort(nodes);
		expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C']));
	});

	test('should return null for invalid node reference', () => {
		// B-A
		const nodes: Node[] = [{ id: 'A', isDelay: false, inputs: ['B'] }];
		const result = topologicalSort(nodes);
		expect(result).toBeNull();
	});

	test('should handle complex graph with multiple delay nodes', () => {
		//  ┌─────┐
		//  A─B─C─E
		// ┌D─┘ │
		// └────┘
		const nodes: Node[] = [
			{ id: 'A', isDelay: false, inputs: [] },
			{ id: 'B', isDelay: true, inputs: ['A', 'D'] },
			{ id: 'C', isDelay: false, inputs: ['B'] },
			{ id: 'D', isDelay: true, inputs: ['C'] },
			{ id: 'E', isDelay: false, inputs: ['A', 'C'] },
		];
		const result = topologicalSort(nodes);
		expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D', 'E']));
	});
});
