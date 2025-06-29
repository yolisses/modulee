import type { EditorData } from '$lib/editor/EditorData';
import { createId } from '$lib/global/createId';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { UndoCommand } from './UndoCommand';

export class UndoMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry, editorData: EditorData): boolean {
		return editorData.history.length > 0;
	}

	createCommand(graphRegistry: GraphRegistry, editorData: EditorData) {
		const lastCommand = editorData.history.at(-1);
		if (!lastCommand) {
			throw new Error('Missing last command');
		}
		return new UndoCommand({
			id: createId(),
			type: 'UndoCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			details: { commandId: lastCommand.id },
		});
	}
}
