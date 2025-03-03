import { RedoCommand } from '$lib/commands/editor/RedoCommand';
import { UndoCommand } from '$lib/commands/editor/UndoCommand';
import type { GraphData } from '$lib/data/GraphData';
import type { EditorCommand } from './EditorCommand';
import type { EditorData } from './EditorData';

/* This piece uses a different graph data than the one from graph data context
to ensure all the changes are deterministic and allow undo, while still allow
other pieces to modify the graph data context to create change previews. */
export class Editor {
	history: EditorCommand[] = $state()!;
	undoneHistory: EditorCommand[] = $state()!;

	onExecute?: (command: EditorCommand) => void;
	onGraphDataChange?: (graphData: GraphData) => void;

	constructor(
		private graphData: GraphData,
		private editorData: EditorData,
	) {
		this.recalculate();
	}

	// TODO consider moving this creation step to a separate function, since all
	// the parts are recreated instead of edited.
	recalculate() {
		const { editorData, graphData } = this;
		// TODO check if using history from editorData makes sense.
		this.history = editorData.history;
		this.undoneHistory = editorData.undoneHistory;

		this.onGraphDataChange?.(graphData);
	}

	getIsUndoOrRedo(command: EditorCommand) {
		return command instanceof UndoCommand || command instanceof RedoCommand;
	}

	execute(command: EditorCommand<unknown>) {
		command.execute(this.graphData, this.editorData);

		// TODO fix this potential data duplication
		if (!this.getIsUndoOrRedo(command)) {
			this.editorData.history.push(command);
			this.editorData.undoneHistory = [];
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
