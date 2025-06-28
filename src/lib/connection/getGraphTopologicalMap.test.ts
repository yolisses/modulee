import type { ConnectionData } from '$lib/data/ConnectionData';
import type { Graph } from '$lib/data/Graph.svelte';
import type { NodeData } from '$lib/data/NodeData';
import { ById } from '$lib/editor/ById';
import { describe, expect, it } from 'vitest';
import { getGraphTopologicalMap } from './getGraphTopologicalMap';

function mockNodes(ids: string[]) {
	return ById.fromItems(
		ids.map((id) => {
			return { id } as NodeData;
		}),
	);
}

function mockConnections(entries: [string, string][]) {
	return ById.fromItems(
		entries.map((entry, index) => {
			return {
				id: '' + index,
				targetNodeId: entry[1],
				inputPath: { nodeId: entry[0] },
			} as ConnectionData;
		}),
	);
}

describe('getGraphTopologicalMap', () => {
	it('returns an empty map for a graph with no nodes', () => {
		const graph = {
			nodes: mockNodes([]),
			connections: ById.fromItems([] as ConnectionData[]),
		} as Graph;
		expect(getGraphTopologicalMap(graph)).toEqual(new Map([]));
	});

	it('returns a map with all node ids and empty arrays for a graph with nodes but no connections', () => {
		const graph = {
			nodes: mockNodes(['a', 'b', 'c']),
			connections: ById.fromItems([] as ConnectionData[]),
		} as Graph;
		expect(getGraphTopologicalMap(graph)).toEqual(
			new Map([
				['a', []],
				['b', []],
				['c', []],
			]),
		);
	});

	it('maps connections correctly between nodes', () => {
		const graph = {
			nodes: mockNodes(['a', 'b', 'c']),
			connections: mockConnections([
				['a', 'b'],
				['b', 'c'],
			]),
		} as Graph;
		expect(getGraphTopologicalMap(graph)).toEqual(
			new Map([
				['a', ['b']],
				['b', ['c']],
				['c', []],
			]),
		);
	});

	it('ignores connections where origin or target node does not exist', () => {
		const graph = {
			nodes: mockNodes(['a', 'b']),
			connections: mockConnections([
				['a', 'b'],
				['a', 'c'],
				['x', 'b'],
			]),
		} as Graph;
		expect(getGraphTopologicalMap(graph)).toEqual(
			new Map([
				['a', ['b']],
				['b', []],
			]),
		);
	});

	it('handles self-loop connections', () => {
		const graph = { nodes: mockNodes(['a']), connections: mockConnections([['a', 'a']]) } as Graph;
		expect(getGraphTopologicalMap(graph)).toEqual(new Map([['a', ['a']]]));
	});
});
