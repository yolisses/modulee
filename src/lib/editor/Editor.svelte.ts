import { RedoCommand } from '$lib/commands/editor/RedoCommand';
import { UndoCommand } from '$lib/commands/editor/UndoCommand';
import { Graph } from '$lib/data/Graph.svelte';
import type { GraphDataContext } from '$lib/graph/graphDataContext';
import type { Command } from './Command';
import type { EditorData } from './EditorData';

export class Editor {
	history: Command[] = $state()!;
	undoneHistory: Command[] = $state()!;

	setGraph?: (graph: Graph) => void;
	onExecute?: (command: Command) => void;

	constructor(
		private graphDataContext: GraphDataContext,
		private editorData: EditorData,
	) {
		this.recalculate();
	}

	// TODO consider moving this creation step to a separate function, since all
	// the parts are recreated instead of edited.
	recalculate() {
		const { editorData, graphDataContext } = this;
		// TODO check if using history from editorData makes sense.
		this.history = editorData.history;
		this.undoneHistory = editorData.undoneHistory;

		const graph = new Graph(graphDataContext.graphData);
		this.setGraph?.(graph);
	}

	getIsUndoOrRedo(command: Command) {
		return command instanceof UndoCommand || command instanceof RedoCommand;
	}

	execute(command: Command<unknown>) {
		const { graphData } = this.graphDataContext;
		command.execute(graphData, this.editorData);

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
