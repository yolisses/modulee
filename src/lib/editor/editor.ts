import type { Node } from '$lib/types/node';
import type { Command } from './command';

export class Editor {
	history: Command[] = [];
	nodes: Node[] = [];

	run(command: Command) {
		command.execute(this);
		this.history.push(command);
	}
}
