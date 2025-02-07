import { findById } from '$lib/array/findById';
import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class SetConstantNodeValue extends Command<{
	value: number;
	nodeId: string;
}> {
	previousValue!: number;

	execute(editorData: EditorData): void {
		const node = findById(editorData.nodes, this.details.nodeId);
		if (node.type !== 'ConstantNode') {
			throw new Error("Can't change the value of a node with type different than ConstantNode");
		}
		this.previousValue = node.extras.value as number;
		node.extras.value = this.details.value;
	}

	undo(editorData: EditorData): void {
		const node = findById(editorData.nodes, this.details.nodeId);
		if (node.type !== 'ConstantNode') {
			throw new Error("Can't change the value of a node with type different than ConstantNode");
		}
		node.extras.value = this.previousValue;
	}
}
