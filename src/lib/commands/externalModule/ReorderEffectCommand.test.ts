import { ById } from '$lib/editor/ById';
import type { EditorData } from '$lib/editor/EditorData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { expect, test } from 'vitest';
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

function createGraphRegistry() {
	return {
		nodes: createNodes(['node1', 'node2', 'node3', 'node4', 'node5']),
		connections: createConnections([
			['connection1', 'node1', 'node2', 'audio'],
			['connection2', 'node2', 'node3', 'audio'],
			['connection3', 'node3', 'node4', 'audio'],
			['connection4', 'node4', 'node5', 'audio'],
		]),
	} as GraphRegistry;
}

function expectConnections(
	graphRegistry: GraphRegistry,
	expected: Array<[string, string, string, string]>,
) {
	expect(graphRegistry.connections).toEqual(createConnections(expected));
}

test('ReorderEffectCommand', () => {
	const effectData = {} as EditorData;
	const graphRegistry = createGraphRegistry();

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

	expectConnections(graphRegistry, [
		['connection1', 'node1', 'node2', 'audio'],
		['connection2', 'node2', 'node3', 'audio'],
		['connection3', 'node3', 'node4', 'audio'],
		['connection4', 'node4', 'node5', 'audio'],
	]);
});
