import { Command } from '$lib/editor/Command';
import type { EditorData } from '$lib/editor/EditorData';

export class SetGroupTypeCommand extends Command<{
	type: string;
	groupId: string;
}> {
	previousType!: string;

	execute(editorData: EditorData): void {
		const { type, groupId } = this.details;
		const group = editorData.groups.get(groupId);
		this.previousType = group.type;
		group.type = type;
	}

	undo(editorData: EditorData): void {
		const { groupId } = this.details;
		const group = editorData.groups.get(groupId);
		group.type = this.previousType;
	}
}
