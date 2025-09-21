import { Vector } from 'nodes-editor';
import { describe, expect, test } from 'vitest';
import type { OrganizingNode } from './OrganizingNode';
import { organizeNodes } from './organizeNodes';

function getResult(map: Map<OrganizingNode, Vector>) {
	return [...map.entries()].map(([key, value]) => {
		return [key.id, [value.x, value.y]];
	});
}

describe('organizeNodes', () => {
	const nodeWidth = 1;

	test('zero nodes', () => {
		const nodes: OrganizingNode[] = [];
		const result = getResult(organizeNodes(nodes, nodeWidth, 0));
		expect(result).toEqual([]);
	});

	test('one node', () => {
		const nodes: OrganizingNode[] = [{ id: 'node1', height: 1, inputs: [] }];
		const result = getResult(organizeNodes(nodes, nodeWidth, 0));
		expect(result).toEqual([['node1', [-0, 0]]]);
	});

	test('two separate nodes', () => {
		const nodes: OrganizingNode[] = [
			{ id: 'node1', height: 1, inputs: [] },
			{ id: 'node2', height: 1, inputs: [] },
		];
		const result = getResult(organizeNodes(nodes, nodeWidth, 0));
		expect(result).toEqual([
			['node2', [-0, 0]],
			['node1', [-0, 1]],
		]);
	});

	test('two connected nodes', () => {
		const nodes: OrganizingNode[] = [
			{ id: 'node1', height: 1, inputs: [] },
			{ id: 'node2', height: 1, inputs: ['node1'] },
		];
		const result = getResult(organizeNodes(nodes, nodeWidth, 0));
		expect(result).toEqual([
			['node2', [-0, 0]],
			['node1', [-1, 0]],
		]);
	});

	test('graph with branch', () => {
		const nodes: OrganizingNode[] = [
			{ id: 'node1', height: 1, inputs: [] },
			{ id: 'node2', height: 1, inputs: ['node1'] },
			{ id: 'node3', height: 1, inputs: ['node1'] },
			{ id: 'node4', height: 1, inputs: ['node2', 'node3'] },
		];
		const result = getResult(organizeNodes(nodes, nodeWidth, 0));
		expect(result).toEqual([
			['node4', [-0, 0]],
			['node2', [-1, 0]],
			['node1', [-2, 0]],
			['node3', [-1, 1]],
		]);
	});
});
