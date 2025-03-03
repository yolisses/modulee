import { RedoCommand } from '$lib/commands/editor/RedoCommand';
import { UndoCommand } from '$lib/commands/editor/UndoCommand';
import { Graph } from '$lib/data/Graph.svelte';
import type { GraphDataContext } from '$lib/graph/graphDataContext';
import type { EditorCommand } from './EditorCommand';
import type { EditorData } from './EditorData';

export class Editor {
	history: EditorCommand[] = $state([])!;
	undoneHistory: EditorCommand[] = $state([])!;

	setGraph?: (graph: Graph) => void;
	onExecute?: (command: EditorCommand) => void;

	constructor(private graphDataContext: GraphDataContext) {
		this.recalculate();
	}

	// TODO consider moving this creation step to a separate function, since all
	// the parts are recreated instead of edited.
	recalculate() {
		const { graphDataContext } = this;
		const graph = new Graph(graphDataContext.graphData);
		this.setGraph?.(graph);
	}

	getIsUndoOrRedo(command: EditorCommand) {
		return command instanceof UndoCommand || command instanceof RedoCommand;
	}

	execute(command: EditorCommand<unknown>) {
		const { graphData } = this.graphDataContext;
		const editorData: EditorData = {
			history: this.history,
			undoneHistory: this.undoneHistory,
		};
		command.execute(graphData, editorData);

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
