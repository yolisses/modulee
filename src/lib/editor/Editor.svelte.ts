import { RedoCommand } from '$lib/commands/RedoCommand';
import { UndoCommand } from '$lib/commands/UndoCommand';
import { Group } from '$lib/data/Group.svelte';
import { Node } from '$lib/data/Node.svelte';
import type { Command } from './Command';
import type { EditorData } from './EditorData';

export class Editor {
	nodes: Node[] = $state([]);
	groups: Group[] = $state([]);
	onExecute?: (command: Command) => void;
	// TODO consider removing these if the commands are never shown
	history: Command[] = $state([]);
	undoneHistory: Command[] = $state([]);

	constructor(private editorData: EditorData) {
		this.recalculate();
	}

	recalculate() {
		this.nodes = this.editorData.nodes.map((nodeData) => new Node(nodeData));
		const inputs = this.nodes.flatMap((node) => node.inputs);
		const outputs = this.nodes.flatMap((node) => node.outputs);

		inputs.forEach((input) => {
			if (!input.connectedOutputId) return;
			const connectedOutput = outputs.find((output) => {
				return output.id === input.connectedOutputId;
			});
			if (!connectedOutput) return;
			input.connectedOutput = connectedOutput;
			connectedOutput.connectedInputs.push(input);
		});

		this.groups = this.editorData.groups.map((groupData) => new Group(groupData));
		this.history = this.editorData.history;
		this.undoneHistory = this.editorData.undoneHistory;
	}

	getIsUndoOrRedo(command: Command) {
		return command instanceof UndoCommand || command instanceof RedoCommand;
	}

	execute(command: Command<any>) {
		command.execute(this.editorData);

		// TODO fix this potential data duplication
		if (!this.getIsUndoOrRedo(command)) {
			this.editorData.history.push(command);
			this.editorData.undoneHistory = [];
		}

		this.recalculate();
		this.onExecute?.(command);
	}

	getCanUndo() {
		return this.history.length > 0;
	}

	getCanRedo() {
		return this.undoneHistory.length > 0;
	}
}
