import type { Command } from '$lib/editor/Command';
import type { Editor } from '$lib/editor/Editor.svelte';
import type { Node } from '$lib/types/Node';

export class RemoveNodeCommand implements Command {
	removedNode!: Node;
	remotionIndex!: number;

	constructor(private nodeId: string) {}

	execute(editor: Editor): void {
		// TODO create a general function to remove from array
		const index = editor.nodes.findIndex((node) => {
			return node.id == this.nodeId;
		});

		if (index === -1) {
			throw new Error('Node not found');
		}

		this.removedNode = editor.nodes[index];
		editor.nodes.splice(index, 1);
	}

	undo(editor: Editor): void {
		// TODO create a general function to reinsert to array
		editor.nodes.splice(this.remotionIndex, 0, this.removedNode);
	}
}
