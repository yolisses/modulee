import { test } from 'vitest';
import { nodeDefinitions } from '../definitions/nodeDefinitions';
import { createNodeData } from './createNodeData';

test('createNodeData', () => {
	nodeDefinitions.forEach((nodeDefinition) => {
		createNodeData(nodeDefinition, 'someId', { x: 1, y: 2 });
	});
});
