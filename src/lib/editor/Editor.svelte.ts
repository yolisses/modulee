import type { Node } from '$lib/types/Node';
import type { Command } from './Command';

export class Editor {
	history: Command[] = [];
	nodes: Node[] = $state([]);
	onChange?: () => void;

	run(command: Command) {
		this.history.push(command);
	}
}
