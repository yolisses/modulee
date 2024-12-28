import type { Node } from '$lib/types/Node';
import type { Command } from './Command';

export class Editor {
	nodes: Node[] = $state([]);
	history: Command[] = $state([]);

	execute(command: Command) {
		this.history.push(command);
		command.execute(this);
	}

	undo() {
		const command = this.history.pop();

		if (!command) {
			throw new Error("Can't undo with empty history");
		}

		command.undo(this);
	}

	getCanUndo() {
		return this.history.length > 0;
	}
}
