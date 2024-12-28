import { findById } from '$lib/array/findById';
import type { Command } from '$lib/editor/Command';
import type { Editor } from '$lib/editor/Editor.svelte';
import type { Vector } from '$lib/space/Vector';

export class MoveNodeCommand implements Command {
	previousPosition!: Vector;

	constructor(
		private nodeId: string,
		private position: Vector
	) {}

	execute(editor: Editor): void {
		const node = findById(editor.nodes, this.nodeId);
		this.previousPosition = node.position;
		node.position = this.position;
	}

	undo(editor: Editor): void {
		const node = findById(editor.nodes, this.nodeId);
		node.position = this.previousPosition;
	}
}
