import { ById } from '$lib/editor/ById';
import { describe, expect, test } from 'vitest';
import { getLayerByNode } from './getLayerByNode';

describe('getLayerByNode', () => {
	test('zero nodes', () => {
		const nodes = ById.fromItems([]);
		const result = getLayerByNode(nodes);
		expect(result).toEqual(new Map([]));
	});

	test('one node', () => {
		const nodes = ById.fromItems([{ id: 'node1', inputs: [] }]);
		const result = getLayerByNode(nodes);
		expect(result).toEqual(new Map([['node1', 0]]));
	});

	test('two separate nodes', () => {
		const nodes = ById.fromItems([
			{ id: 'node1', inputs: [] },
			{ id: 'node2', inputs: [] },
		]);
		const result = getLayerByNode(nodes);
		expect(result).toEqual(
			new Map([
				['node1', 0],
				['node2', 0],
			]),
		);
	});

	test('two connected nodes', () => {
		const nodes = ById.fromItems([
			{ id: 'node1', inputs: [] },
			{ id: 'node2', inputs: ['node1'] },
		]);
		const result = getLayerByNode(nodes);
		expect(result).toEqual(
			new Map([
				['node1', 1],
				['node2', 0],
			]),
		);
	});

	test('graph with branch', () => {
		const nodes = ById.fromItems([
			{ id: 'node1', inputs: [] },
			{ id: 'node2', inputs: ['node1'] },
			{ id: 'node3', inputs: ['node1'] },
			{ id: 'node4', inputs: ['node2', 'node3'] },
		]);
		const result = getLayerByNode(nodes);
		expect(result).toEqual(
			new Map([
				['node4', 0],
				['node2', 1],
				['node1', 2],
				['node3', 1],
			]),
		);
	});

	test('with layer change', () => {
		const nodes = ById.fromItems([
			{ id: 'node1', inputs: [] },
			{ id: 'node2', inputs: ['node1'] },
			{ id: 'node3', inputs: ['node1'] },
			{ id: 'node4', inputs: ['node3'] },
		]);
		const result = getLayerByNode(nodes);
		expect(result).toEqual(
			new Map([
				['node1', 2],
				['node2', 0],
				['node3', 1],
				['node4', 0],
			]),
		);
	});
});
