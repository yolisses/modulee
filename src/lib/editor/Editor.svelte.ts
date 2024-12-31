import { Node } from '$lib/node/Node.svelte';
import type { Command } from './Command';
import type { EditorData } from './EditorData';

export class Editor {
	nodes: Node[] = $state([]);
	history: Command[] = $state([]);
	undoneHistory: Command[] = $state([]);

	constructor(private editorData: EditorData) {
		this.recalculate();
	}

	static createEmpty() {
		return new Editor({ nodes: [] });
	}

	recalculate() {
		this.nodes = this.editorData.nodes.map((nodeData) => new Node(nodeData));
	}

	execute(command: Command<any>) {
		this.history.push(command);
		command.execute(this.editorData);
		this.undoneHistory = [];
		this.recalculate();
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
