import { createId } from '$lib/global/createId';
import { expect, test } from 'vitest';
import type { OutputNodeData } from '../data/variants/OutputNodeData';
import { NodeSchema } from './NodeSchema';

test('OutputNodeSchema', () => {
	const outputNodeData: OutputNodeData = {
		extras: {},
		id: createId(),
		type: 'OutputNode',
		position: { x: 1, y: 2 },
		internalModuleId: createId(),
		unconnectedInputValues: { input: 3 },
	};
	NodeSchema.parse(outputNodeData);
});

test('OutputNodeSchema with incorrect input', () => {
	const outputNodeData: OutputNodeData = {
		extras: {},
		id: createId(),
		type: 'OutputNode',
		position: { x: 1, y: 2 },
		internalModuleId: createId(),
		unconnectedInputValues: { input1: 3 },
	};
	expect(() => NodeSchema.parse(outputNodeData)).toThrow();
});
