import { UndoCommand } from '$lib/commands/UndoCommand';
import { Group } from '$lib/data/Group.svelte';
import { Node } from '$lib/data/Node.svelte';
import type { Command } from './Command';
import type { EditorData } from './EditorData';

export class Editor {
	nodes: Node[] = $state([]);
	groups: Group[] = $state([]);
	history: Command[] = $state([]);
	undoneHistory: Command[] = $state([]);
	onExecute?: (command: Command) => void;

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
	}

	execute(command: Command<any>) {
		command.execute(this.editorData);

		// TODO fix this potential data duplication
		if (!(command instanceof UndoCommand)) {
			this.history.push(command);
			this.editorData.history.push(command.commandData);
		}

		this.undoneHistory = [];
		this.recalculate();
		this.onExecute?.(command);
	}

	redo() {
		const command = this.undoneHistory.pop();

		if (!command) {
			throw new Error("Can't redo with empty undo history");
		}

		this.history.push(command);
		command.execute(this.editorData);
		this.recalculate();
	}

	getCanUndo() {
		return this.history.length > 0;
	}

	getCanRedo() {
		return this.undoneHistory.length > 0;
	}
}
