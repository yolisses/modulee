import { removeById } from '$lib/array/removeById';
import type { NodeData } from '$lib/data/NodeData';
import { Command } from '$lib/editor/Command';
import type { CommandData } from '$lib/editor/CommandData';
import type { CreateCommandCallback } from '$lib/editor/CreateCommandCallback';
import type { EditorData } from '$lib/editor/EditorData';
import { expect, test } from 'vitest';
import { mockCommandData } from './test/mockNodeData';
import { UndoCommand } from './UndoCommand';

type MockCommandDetails = { nodeId: string };
type MockCommandData = CommandData<MockCommandDetails>;
class MockCommand extends Command<MockCommandDetails> {
	execute(editorData: EditorData): void {
		editorData.nodes.push({ id: this.details.nodeId } as NodeData);
	}

	undo(editorData: EditorData): void {
		removeById(editorData.nodes, this.details.nodeId);
	}
}
const mockCreateCommandCallback: CreateCommandCallback = (commandData: CommandData) => {
	return new MockCommand(commandData as MockCommandData);
};

test('AddNodeCommand', () => {
	const editorData = {
		nodes: [] as NodeData[],
		history: [] as CommandData[],
	} as EditorData;

	// Execute mockCommand1

	const mockCommand1 = new MockCommand({
		id: 'mockCommand1',
		details: { nodeId: 'node1' },
	} as CommandData<MockCommandDetails>);
	mockCommand1.execute(editorData);
	editorData.history.push(mockCommand1.commandData);

	expect(editorData.history).toHaveLength(1);
	expect(editorData.nodes).toEqual([{ id: 'node1' }]);

	// Execute mockCommand2

	const mockCommand2 = new MockCommand({
		id: 'mockCommand2',
		details: { nodeId: 'node2' },
	} as MockCommandData);
	mockCommand2.execute(editorData);
	editorData.history.push(mockCommand2.commandData);

	expect(editorData.history).toHaveLength(2);
	expect(editorData.nodes).toEqual([{ id: 'node1' }, { id: 'node2' }]);

	// Undo mockCommand2

	const command = new UndoCommand(mockCommandData({ commandId: 'mockCommand2' }));
	command.createCommandCallback = mockCreateCommandCallback;
	command.execute(editorData);

	expect(editorData.history).toHaveLength(1);
	expect(editorData.nodes).toEqual([{ id: 'node1' }]);

	// Undo undo mockCommand2

	command.undo(editorData);

	expect(editorData.history).toHaveLength(2);
	expect(editorData.nodes).toEqual([{ id: 'node1' }, { id: 'node2' }]);
});
