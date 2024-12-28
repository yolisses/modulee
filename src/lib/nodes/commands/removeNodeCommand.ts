import type { Command } from '$lib/editor/command';
import type { Editor } from '$lib/editor/editor';

export class RemoveNodeCommand implements Command {
	constructor(private nodeId: string) {}

	execute(editor: Editor): void {
		const index = editor.nodes.findIndex((node) => {
			return node.id == this.nodeId;
		});

		if (index === -1) {
			throw new Error('Node not found');
		}

		editor.nodes.splice(index, 1);
	}

	undo(editor: Editor): void {
		throw new Error('Method not implemented.');
	}
}
