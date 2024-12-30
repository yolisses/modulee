import { reinsert } from '$lib/array/reinsert';
import type { Remotion } from '$lib/array/remotion';
import { removeById } from '$lib/array/removeById';
import type { Command } from '$lib/editor/Command';
import type { Editor } from '$lib/editor/Editor.svelte';
import type { Node } from '../Node.svelte';

export class RemoveNodeCommand implements Command {
	remotion!: Remotion<Node>;

	constructor(private nodeId: string) {}

	execute(editor: Editor): void {
		this.remotion = removeById(editor.nodes, this.nodeId);
	}

	undo(editor: Editor): void {
		reinsert(editor.nodes, this.remotion);
	}
}
