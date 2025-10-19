import type { GraphData } from '$lib/graph/GraphData';
import { getGraphData } from '$lib/project/getGraphData';
import { getGraphRegistry } from '$lib/project/getGraphRegistry';
import { describe, expect, it, vi } from 'vitest';
import { flattenModuleNodes } from './flattenModuleNodes';

function mockCreateId() {
	vi.mock('$lib/global/createId', () => {
		let counter = 0;
		return {
			counter,
			createId: () => 'newId' + counter++,
		};
	});
}

describe('flattenModuleNodes', () => {
	it('does not interfere nodes unrelated to module', () => {
		mockCreateId();
		const graphData = {
			internalModules: [{ id: 'module1' }],
			nodes: [
				{ id: 'node1', internalModuleId: 'module1' },
				{ id: 'node2', internalModuleId: 'module1' },
				{ id: 'node3', internalModuleId: 'module1' },
				{ id: 'node4', internalModuleId: 'module2' },
				{ id: 'node5', internalModuleId: 'module2' },
				{ id: 'node6', internalModuleId: 'module2' },
			],
			connections: [
				{ id: 'connection1', inputPath: { nodeId: 'node2' }, targetNodeId: 'node1' },
				{ id: 'connection2', inputPath: { nodeId: 'node3' }, targetNodeId: 'node2' },
				{ id: 'connection3', inputPath: { nodeId: 'node5' }, targetNodeId: 'node4' },
				{ id: 'connection4', inputPath: { nodeId: 'node6' }, targetNodeId: 'node5' },
			],
		} as GraphData;
		const graphRegistry = getGraphRegistry(graphData, []);

		flattenModuleNodes(graphRegistry);

		expect(getGraphData(graphRegistry)).toEqual(graphData);
	});
});
