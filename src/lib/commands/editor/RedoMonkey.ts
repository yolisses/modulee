import { createId } from '$lib/data/createId';
import type { EditorData } from '$lib/editor/EditorData';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import { EditorMonkey } from '$lib/monkey/EditorMonkey';
import { FAKE_PROJECT_ID } from '$lib/monkey/FAKE_PROJECT_ID';
import { RedoCommand } from './RedoCommand';

export class RedoMonkey extends EditorMonkey {
	getCanBeUsed(graphRegistry: GraphRegistry, editorData: EditorData): boolean {
		return editorData.undoneHistory.length > 0;
	}

	createCommand(graphRegistry: GraphRegistry, editorData: EditorData) {
		const lastCommand = editorData.undoneHistory.at(-1);
		if (!lastCommand) {
			throw new Error('Missing last command');
		}
		return new RedoCommand({
			id: createId(),
			type: 'RedoCommand',
			projectId: FAKE_PROJECT_ID,
			createdAt: new Date().toJSON(),
			details: { commandId: lastCommand.id },
		});
	}
}
