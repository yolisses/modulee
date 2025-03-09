import { RedoCommand } from '$lib/commands/editor/RedoCommand';
import { UndoCommand } from '$lib/commands/editor/UndoCommand';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { cloneGraphRegistry } from '$lib/process/cloneGraphRegistry';
import type { EditorCommand } from './EditorCommand';
import type { EditorData } from './EditorData';

export class Editor {
	history: EditorCommand[] = $state([])!;
	undoneHistory: EditorCommand[] = $state([])!;
	private graphRegistry = $state<GraphRegistry>()!;

	onExecute?: (command: EditorCommand) => void;
	setGraphRegistry?: (graphRegistry: GraphRegistry) => void;

	constructor(initialGraphRegistry: GraphRegistry) {
		this.graphRegistry = cloneGraphRegistry(initialGraphRegistry);
		this.recalculate();
	}

	recalculate() {
		this.setGraphRegistry?.(cloneGraphRegistry(this.graphRegistry));
	}

	getIsUndoOrRedo(command: EditorCommand) {
		return command instanceof UndoCommand || command instanceof RedoCommand;
	}

	execute(command: EditorCommand<unknown>) {
		const editorData: EditorData = {
			history: this.history,
			undoneHistory: this.undoneHistory,
		};
		command.execute(this.graphRegistry, editorData);

		// TODO fix this potential data duplication
		if (!this.getIsUndoOrRedo(command)) {
			this.history.push(command);
			this.undoneHistory = [];
		}

		this.recalculate();
		this.onExecute?.(command);
	}

	getCanUndo() {
		return this.history.length > 0;
	}

	getCanRedo() {
		return this.undoneHistory.length > 0;
	}
}
