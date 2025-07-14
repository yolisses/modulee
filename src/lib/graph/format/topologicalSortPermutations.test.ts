import { getId } from '$lib/ui/getId';
import { describe, expect, test } from 'vitest';
import type { TopologicalNode } from './TopologicalNode';
import { topologicalSort } from './topologicalSort';

// Helper function to generate all permutations of an array
function generatePermutations<T>(arr: T[]): T[][] {
	const results: T[][] = [];

	function permute(input: T[], current: T[] = []) {
		if (input.length === 0) {
			results.push([...current]);
			return;
		}
		for (let i = 0; i < input.length; i++) {
			const newInput = [...input];
			const [item] = newInput.splice(i, 1);
			permute(newInput, [...current, item]);
		}
	}

	permute(arr);
	return results;
}

// Helper function to test topological sort on all permutations of nodes
export function testTopologicalSortPermutations(
	nodes: TopologicalNode[],
	expected: string[],
	testName: string,
) {
	const permutations = generatePermutations(nodes);
	permutations.forEach((permutedNodes) => {
		test(`${testName} - permutation ${permutedNodes.map(getId)}`, () => {
			const result = topologicalSort(permutedNodes);
			expect(result).toEqual(expected);
		});
	});
}

describe('topologicalSort with permutations', () => {
	testTopologicalSortPermutations(
		[{ id: 'A', inputs: ['A'], isDelay: true }],
		['A'],
		'1 node cycle with delay',
	);

	testTopologicalSortPermutations(
		[
			{ id: 'A', inputs: ['B'], isDelay: false },
			{ id: 'B', inputs: ['A'], isDelay: true },
		],
		['B', 'A'],
		'2 nodes cycle with delay',
	);

	testTopologicalSortPermutations(
		[
			{ id: 'A', inputs: ['C'], isDelay: false },
			{ id: 'B', inputs: ['A'], isDelay: true },
			{ id: 'C', inputs: ['B'], isDelay: false },
		],
		['B', 'C', 'A'],
		'3 nodes cycle with delay',
	);

	testTopologicalSortPermutations(
		[
			{ id: 'A', inputs: ['E'], isDelay: false },
			{ id: 'B', inputs: ['A'], isDelay: true },
			{ id: 'C', inputs: ['B'], isDelay: false },
			{ id: 'D', inputs: ['C'], isDelay: false },
			{ id: 'E', inputs: ['D'], isDelay: false },
		],
		['B', 'C', 'D', 'E', 'A'],
		'5 nodes cycle with delay',
	);
});
