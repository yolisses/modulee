import { RedoCommand } from '$lib/commands/editor/RedoCommand';
import { UndoCommand } from '$lib/commands/editor/UndoCommand';
import { Graph } from '$lib/data/Graph.svelte';
import type { GraphData } from '$lib/data/GraphData';
import { cloneGraphData } from '$lib/process/cloneGraphData';
import type { EditorCommand } from './EditorCommand';
import type { EditorData } from './EditorData';

export class Editor {
	history: EditorCommand[] = $state([])!;
	undoneHistory: EditorCommand[] = $state([])!;
	private graphData = $state<GraphData>()!;

	setGraph?: (graph: Graph) => void;
	onExecute?: (command: EditorCommand) => void;

	constructor(initialGraphData: GraphData) {
		this.graphData = cloneGraphData(initialGraphData);
		this.recalculate();
	}

	// TODO consider moving this creation step to a separate function, since all
	// the parts are recreated instead of edited.
	recalculate() {
		const graph = new Graph(this.graphData);
		this.setGraph?.(graph);
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
