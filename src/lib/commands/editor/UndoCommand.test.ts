import type { GraphData } from '$lib/data/GraphData';
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
	execute(graphData: GraphData): void {
		const { nodeId } = this.details;
		graphData.nodes.add({ id: nodeId } as NodeData);
	}

	undo(graphData: GraphData): void {
		const { nodeId } = this.details;
		graphData.nodes.removeById(nodeId);
	}
}
const mockCreateCommandCallback: CreateEditorCommandCallback = (commandData: EditorCommandData) => {
	return new MockCommand(commandData as MockCommandData);
};

test('UndoCommand', () => {
	const graphData = { nodes: new ById() } as GraphData;
	const editorData = {
		history: [] as EditorCommand[],
		undoneHistory: [] as EditorCommand[],
	} as EditorData;

	// Execute mockCommand1

	const mockCommand1 = new MockCommand({
		id: 'mockCommand1',
		details: { nodeId: 'node1' },
	} as EditorCommandData<MockCommandDetails>);
	mockCommand1.execute(graphData);
	editorData.history.push(mockCommand1);

	expect(editorData.history).toHaveLength(1);
	expect(graphData.nodes.values()).toEqual([{ id: 'node1' }]);

	// Execute mockCommand2

	const mockCommand2 = new MockCommand({
		id: 'mockCommand2',
		details: { nodeId: 'node2' },
	} as MockCommandData);
	mockCommand2.execute(graphData);
	editorData.history.push(mockCommand2);

	expect(editorData.history).toHaveLength(2);
	expect(graphData.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);

	// Undo mockCommand2

	const command = new UndoCommand(mockCommandData({ commandId: 'mockCommand2' }));
	command.createCommandCallback = mockCreateCommandCallback;
	command.execute(graphData, editorData);

	expect(editorData.history).toHaveLength(1);
	expect(graphData.nodes.values()).toEqual([{ id: 'node1' }]);
});
