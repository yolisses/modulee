import { Node } from '$lib/data/Node.svelte.js';
import type { Command } from './Command.js';
import type { EditorData } from './EditorData.js';

export class Editor {
	nodes: Node[] = $state([]);
	history: Command[] = $state([]);
	undoneHistory: Command[] = $state([]);
	onExecute?: (command: Command) => void;

	constructor(private editorData: EditorData) {
		this.recalculate();
	}

	static createEmpty() {
		return new Editor({ nodes: [] });
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
	}

	execute(command: Command<any>) {
		this.history.push(command);
		command.execute(this.editorData);
		this.undoneHistory = [];
		this.recalculate();
		this.onExecute?.(command);
	}

	undo() {
		const command = this.history.pop();

		if (!command) {
			throw new Error("Can't undo with empty history");
		}

		command.undo(this.editorData);
		this.undoneHistory.push(command);
		this.recalculate();
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
