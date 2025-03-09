import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { NodeData } from '$lib/data/NodeData';
import { ById } from '$lib/editor/ById';
import type { CreateEditorCommandCallback } from '$lib/editor/CreateEditorCommandCallback';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { EditorCommandData } from '$lib/editor/EditorCommandData';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { mockCommandData } from '../test/mockNodeData';
import { UndoCommand } from './UndoCommand';

type MockCommandDetails = { nodeId: string };
type MockCommandData = EditorCommandData<MockCommandDetails>;
class MockCommand extends EditorCommand<MockCommandDetails> {
	execute(graphRegistry: GraphRegistry): void {
		const { nodeId } = this.details;
		graphRegistry.nodes.add({ id: nodeId } as NodeData);
	}

	undo(graphRegistry: GraphRegistry): void {
		const { nodeId } = this.details;
		graphRegistry.nodes.removeById(nodeId);
	}
}
const mockCreateCommandCallback: CreateEditorCommandCallback = (commandData: EditorCommandData) => {
	return new MockCommand(commandData as MockCommandData);
};

test('UndoCommand', () => {
	const graphRegistry = { nodes: new ById() } as GraphRegistry;
	const editorData = {
		history: [] as EditorCommand[],
		undoneHistory: [] as EditorCommand[],
	} as EditorData;

	// Execute mockCommand1

	const mockCommand1 = new MockCommand({
		id: 'mockCommand1',
		details: { nodeId: 'node1' },
	} as EditorCommandData<MockCommandDetails>);
	mockCommand1.execute(graphRegistry);
	editorData.history.push(mockCommand1);

	expect(editorData.history).toHaveLength(1);
	expect(graphRegistry.nodes.values()).toEqual([{ id: 'node1' }]);

	// Execute mockCommand2

	const mockCommand2 = new MockCommand({
		id: 'mockCommand2',
		details: { nodeId: 'node2' },
	} as MockCommandData);
	mockCommand2.execute(graphRegistry);
	editorData.history.push(mockCommand2);

	expect(editorData.history).toHaveLength(2);
	expect(graphRegistry.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);

	// Undo mockCommand2

	const command = new UndoCommand(mockCommandData({ commandId: 'mockCommand2' }));
	command.createCommandCallback = mockCreateCommandCallback;
	command.execute(graphRegistry, editorData);

	expect(editorData.history).toHaveLength(1);
	expect(graphRegistry.nodes.values()).toEqual([{ id: 'node1' }]);
});
