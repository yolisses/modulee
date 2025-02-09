import type { NodeData } from '$lib/data/NodeData';
import { ById } from '$lib/editor/ById.svelte';
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
		const { nodeId } = this.details;
		editorData.nodes.add({ id: nodeId } as NodeData);
	}

	undo(editorData: EditorData): void {
		const { nodeId } = this.details;
		editorData.nodes.removeById(nodeId);
	}
}
const mockCreateCommandCallback: CreateCommandCallback = (commandData: CommandData) => {
	return new MockCommand(commandData as MockCommandData);
};

test('AddNodeCommand', () => {
	const editorData = {
		nodes: new ById(),
		history: [] as Command[],
		undoneHistory: [] as Command[],
	} as EditorData;

	// Execute mockCommand1

	const mockCommand1 = new MockCommand({
		id: 'mockCommand1',
		details: { nodeId: 'node1' },
	} as CommandData<MockCommandDetails>);
	mockCommand1.execute(editorData);
	editorData.history.push(mockCommand1);

	expect(editorData.history).toHaveLength(1);
	expect(editorData.nodes.values()).toEqual([{ id: 'node1' }]);

	// Execute mockCommand2

	const mockCommand2 = new MockCommand({
		id: 'mockCommand2',
		details: { nodeId: 'node2' },
	} as MockCommandData);
	mockCommand2.execute(editorData);
	editorData.history.push(mockCommand2);

	expect(editorData.history).toHaveLength(2);
	expect(editorData.nodes.values()).toEqual([{ id: 'node1' }, { id: 'node2' }]);

	// Undo mockCommand2

	const command = new UndoCommand(mockCommandData({ commandId: 'mockCommand2' }));
	command.createCommandCallback = mockCreateCommandCallback;
	command.execute(editorData);

	expect(editorData.history).toHaveLength(1);
	expect(editorData.nodes.values()).toEqual([{ id: 'node1' }]);
});
