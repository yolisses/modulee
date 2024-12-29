import type { Node } from '$lib/nodes/Node';
import type { Command } from './Command';

export class Editor {
	nodes: Node[] = $state([]);
	history: Command[] = $state([]);
	undoneHistory: Command[] = $state([]);

	execute(command: Command) {
		this.history.push(command);
		command.execute(this);
		this.undoneHistory = [];
	}

	undo() {
		const command = this.history.pop();

		if (!command) {
			throw new Error("Can't undo with empty history");
		}

		command.undo(this);
		this.undoneHistory.push(command);
	}

	redo() {
		const command = this.undoneHistory.pop();

		if (!command) {
			throw new Error("Can't redo with empty undo history");
		}

		this.history.push(command);
		command.execute(this);
	}

	getCanUndo() {
		return this.history.length > 0;
	}

	getCanRedo() {
		return this.undoneHistory.length > 0;
	}
}
