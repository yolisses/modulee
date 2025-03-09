import { RedoCommand } from '$lib/commands/editor/RedoCommand';
import { UndoCommand } from '$lib/commands/editor/UndoCommand';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { cloneGraphData } from '$lib/process/cloneGraphData';
import type { EditorCommand } from './EditorCommand';
import type { EditorData } from './EditorData';

export class Editor {
	history: EditorCommand[] = $state([])!;
	undoneHistory: EditorCommand[] = $state([])!;
	private graphData = $state<GraphRegistry>()!;

	onExecute?: (command: EditorCommand) => void;
	setGraphData?: (graphData: GraphRegistry) => void;

	constructor(initialGraphData: GraphRegistry) {
		this.graphData = cloneGraphData(initialGraphData);
		this.recalculate();
	}

	recalculate() {
		this.setGraphData?.(cloneGraphData(this.graphData));
	}

	getIsUndoOrRedo(command: EditorCommand) {
		return command instanceof UndoCommand || command instanceof RedoCommand;
	}

	execute(command: EditorCommand<unknown>) {
		const editorData: EditorData = {
			history: this.history,
			undoneHistory: this.undoneHistory,
		};
		command.execute(this.graphData, editorData);

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
