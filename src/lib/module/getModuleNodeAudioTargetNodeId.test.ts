import { ById } from '$lib/editor/ById';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { describe, expect, it } from 'vitest';
import { getModuleNodeAudioTargetNodeId } from './getModuleNodeAudioTargetNodeId';

describe('getModuleNodeAudioTargetNodeId', () => {
	it('returns undefined for 0 audio connections', () => {
		const graphRegistry = {
			connections: ById.fromItems([
				{ id: 'connection1', inputPath: { nodeId: 'node1', inputKey: 'someInput' } },
				{ id: 'connection2', inputPath: { nodeId: 'node2', inputKey: 'audio' } },
			]),
		} as GraphRegistry;
		expect(getModuleNodeAudioTargetNodeId('node1', graphRegistry)).toBeUndefined();
	});

	it('returns string for 1 audio connection', () => {
		const graphRegistry = {
			connections: ById.fromItems([
				{
					id: 'connection1',
					targetNodeId: 'node3',
					inputPath: { nodeId: 'node1', inputKey: 'someInput' },
				},
				{
					id: 'connection2',
					targetNodeId: 'node4',
					inputPath: { nodeId: 'node2', inputKey: 'audio' },
				},
				{
					id: 'connection3',
					targetNodeId: 'node5',
					inputPath: { nodeId: 'node1', inputKey: 'audio' },
				},
			]),
		} as GraphRegistry;
		expect(getModuleNodeAudioTargetNodeId('node1', graphRegistry)).toEqual('node5');
	});

	it('throws for more than 1 audio connection', () => {
		const graphRegistry = {
			connections: ById.fromItems([
				{ id: 'connection1', inputPath: { nodeId: 'node1', inputKey: 'someInput' } },
				{ id: 'connection2', inputPath: { nodeId: 'node2', inputKey: 'audio' } },
				{ id: 'connection3', inputPath: { nodeId: 'node1', inputKey: 'audio' } },
				{ id: 'connection4', inputPath: { nodeId: 'node1', inputKey: 'audio' } },
			]),
		} as GraphRegistry;
		expect(() => getModuleNodeAudioTargetNodeId('node1', graphRegistry)).toThrow();
	});
});
