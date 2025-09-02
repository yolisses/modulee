import { createId } from '$lib/global/createId';
import { test } from 'vitest';
import { nodeDefinitions } from '../definitions/nodeDefinitions';
import { createNodeData } from './createNodeData';

test('createNodeData', () => {
	nodeDefinitions
		.filter((nodeDefinition) => !nodeDefinition.isIntermediary)
		.forEach((nodeDefinition) => {
			createNodeData(nodeDefinition, createId(), { x: 1, y: 2 });
		});
});
