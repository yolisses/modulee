import { Vector } from 'nodes-editor';
import { describe, expect, test } from 'vitest';
import type { FormatingNode } from './FormatingNode';
import { formatNodes } from './formatNodes';

describe('formatNodes', () => {
	test('zero nodes', () => {
		const nodes: FormatingNode[] = [];
		const positions = formatNodes(nodes);
		expect(positions).toEqual([]);
	});

	test('zero nodes', () => {
		const nodes: FormatingNode[] = [{ id: 'node1', inputs: [] }];
		const positions = formatNodes(nodes);
		expect(positions).toEqual([new Vector(0, 0)]);
	});
});
