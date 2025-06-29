import { createId } from '$lib/data/createId';
import type { OutputNodeData } from '$lib/data/variants/OutputNodeData';
import { expect, test } from 'vitest';
import { NodeSchema } from '../schemas/NodeSchema';

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
