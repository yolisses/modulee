import { ById } from '$lib/editor/ById';
import type { EditorData } from '$lib/editor/EditorData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { describe, expect, it } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { ReorderEffectCommand } from './ReorderEffectCommand';

function createNodes(ids: string[]) {
	return ById.fromItems(ids.map((id) => ({ id, type: 'ModuleNode' })));
}

function createConnections(conns: Array<[string, string, string, string]>) {
	return ById.fromItems(
		conns.map(([id, targetNodeId, inputNodeId, inputKey]) => ({
			id,
			targetNodeId,
			inputPath: { nodeId: inputNodeId, inputKey },
		})),
	);
}

function createInitialConnectionSimpleData(): Array<[string, string, string, string]> {
	return [
		['connection1', 'node1', 'node2', 'audio'],
		['connection2', 'node2', 'node3', 'audio'],
		['connection3', 'node3', 'node4', 'audio'],
		['connection4', 'node4', 'node5', 'audio'],
	];
}

function createGraphRegistry() {
	return {
		nodes: createNodes(['node1', 'node2', 'node3', 'node4', 'node5']),
		connections: createConnections(createInitialConnectionSimpleData()),
	} as GraphRegistry;
}

function expectConnections(
	graphRegistry: GraphRegistry,
	expected: Array<[string, string, string, string]>,
) {
	expect(graphRegistry.connections).toEqual(createConnections(expected));
}

describe('ReorderEffectCommand', () => {
	it('should work moving to before a connect node', () => {
		const effectData = {} as EditorData;
		const graphRegistry = createGraphRegistry();

		// 1<-2<-3<-4<-5
		// 1<-3<-4<-2<-5

		const command = new ReorderEffectCommand(
			mockCommandData({
				direction: 'before',
				moduleNodeId: 'node2',
				referenceNodeId: 'node5',
			}),
		);

		command.execute(graphRegistry, effectData);

		expectConnections(graphRegistry, [
			['connection1', 'node4', 'node2', 'audio'],
			['connection2', 'node1', 'node3', 'audio'],
			['connection3', 'node3', 'node4', 'audio'],
			['connection4', 'node2', 'node5', 'audio'],
		]);

		command.undo(graphRegistry, effectData);

		expectConnections(graphRegistry, createInitialConnectionSimpleData());
	});

	it('should work moving to after a connect node', () => {
		// 1<-2<-3<-4<-5
		// 1<-3<-4<-2<-5

		const effectData = {} as EditorData;
		const graphRegistry = createGraphRegistry();

		const command = new ReorderEffectCommand(
			mockCommandData({
				direction: 'after',
				moduleNodeId: 'node2',
				referenceNodeId: 'node4',
			}),
		);

		command.execute(graphRegistry, effectData);

		expectConnections(graphRegistry, [
			['connection1', 'node4', 'node2', 'audio'],
			['connection2', 'node1', 'node3', 'audio'],
			['connection3', 'node3', 'node4', 'audio'],
			['connection4', 'node2', 'node5', 'audio'],
		]);

		command.undo(graphRegistry, effectData);

		expectConnections(graphRegistry, createInitialConnectionSimpleData());
	});

	it('should work moving to before the first node', () => {
		// 1<-2<-3<-4<-5
		// 2<-1<-3<-4<-5

		const effectData = {} as EditorData;
		const graphRegistry = createGraphRegistry();

		const command = new ReorderEffectCommand(
			mockCommandData({
				direction: 'before',
				moduleNodeId: 'node2',
				referenceNodeId: 'node1',
				newConnectionId: 'connection5',
			}),
		);

		command.execute(graphRegistry, effectData);

		expectConnections(graphRegistry, [
			['connection2', 'node1', 'node3', 'audio'],
			['connection3', 'node3', 'node4', 'audio'],
			['connection4', 'node4', 'node5', 'audio'],
			['connection5', 'node2', 'node1', 'audio'],
		]);

		command.undo(graphRegistry, effectData);

		expectConnections(graphRegistry, createInitialConnectionSimpleData());
	});

	it('should work moving to after the last node', () => {
		// 1<-2<-3<-4<-5
		// 1<-3<-4<-5<-2

		const effectData = {} as EditorData;
		const graphRegistry = createGraphRegistry();

		const command = new ReorderEffectCommand(
			mockCommandData({
				direction: 'after',
				moduleNodeId: 'node2',
				referenceNodeId: 'node5',
				newConnectionId: 'connection5',
			}),
		);

		command.execute(graphRegistry, effectData);

		expectConnections(graphRegistry, [
			['connection1', 'node5', 'node2', 'audio'],
			['connection2', 'node1', 'node3', 'audio'],
			['connection3', 'node3', 'node4', 'audio'],
			['connection4', 'node4', 'node5', 'audio'],
		]);

		command.undo(graphRegistry, effectData);

		expectConnections(graphRegistry, createInitialConnectionSimpleData());
	});
});
