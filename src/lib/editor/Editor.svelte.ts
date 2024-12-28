import type { Node } from '$lib/types/Node';
import type { Command } from './Command';

export class Editor {
	history: Command[] = [];
	nodes: Node[] = $state([]);
	onChange?: () => void;

	run(command: Command) {
		command.execute(this);
		this.history.push(command);
		console.log(this.history);

		if (this.onChange) {
			this.onChange();
		}
	}
}
