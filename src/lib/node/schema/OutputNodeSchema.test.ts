import { createId } from '$lib/global/createId';
import { expect, test } from 'vitest';
import type { OutputNodeData } from '../data/variants/OutputNodeData';
import { NodeSchema } from './NodeSchema';

test('OutputNodeSchema', () => {
	const outputNodeData: OutputNodeData = {
		extras: { channel: 0 },
		id: createId(),
		internalModuleId: createId(),
		isInputAutoConnectedMap: {},
		position: { x: 1, y: 2 },
		type: 'OutputNode',
		unconnectedInputValues: { input: 3 },
	};
	NodeSchema.parse(outputNodeData);
});

test('OutputNodeSchema with incorrect input', () => {
	const outputNodeData: OutputNodeData = {
		extras: { channel: 0 },
		id: createId(),
		internalModuleId: createId(),
		isInputAutoConnectedMap: {},
		position: { x: 1, y: 2 },
		type: 'OutputNode',
		unconnectedInputValues: { input1: 3 },
	};
	expect(() => NodeSchema.parse(outputNodeData)).toThrow();
});
