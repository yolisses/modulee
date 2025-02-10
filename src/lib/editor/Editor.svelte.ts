import { RedoCommand } from '$lib/commands/RedoCommand';
import { UndoCommand } from '$lib/commands/UndoCommand';
import { Connection } from '$lib/data/Connection';
import type { Connector } from '$lib/data/Connector';
import { Group } from '$lib/data/Group.svelte';
import { Node } from '$lib/data/Node.svelte';
import { ById } from './ById.svelte';
import type { Command } from './Command';
import type { EditorData } from './EditorData';

export class Editor {
	nodes = new ById<Node>();
	groups = new ById<Group>();
	connectors = new ById<Connector>();
	connections = new ById<Connection>();
	history: Command[] = $state()!;
	undoneHistory: Command[] = $state()!;
	onExecute?: (command: Command) => void;

	constructor(private editorData: EditorData) {
		this.recalculate();
	}

	// TODO consider moving this creation step to a separate function, since all
	// the parts are recreated instead of edited.
	recalculate() {
		const { editorData } = this;
		// TODO check if using history from editorData makes sense.
		this.history = editorData.history;
		this.undoneHistory = editorData.undoneHistory;

		this.nodes.clear();
		this.groups.clear();
		this.connectors.clear();
		this.connections.clear();

		editorData.nodes.values().forEach((nodeData) => {
			const node = new Node(nodeData, editorData.connections);
			this.nodes.add(node);
		});

		editorData.groups.values().forEach((groupData) => {
			const group = new Group(groupData, this.nodes);
			this.groups.add(group);
		});

		editorData.connections.values().forEach((connectionData) => {
			const connection = new Connection(connectionData);
			this.connections.add(connection);
		});

		this.nodes.values().forEach((node) => {
			this.connectors.add(node.output);
			node.inputs.forEach((input) => {
				this.connectors.add(input);
			});
		});
	}

	getIsUndoOrRedo(command: Command) {
		return command instanceof UndoCommand || command instanceof RedoCommand;
	}

	execute(command: Command<unknown>) {
		command.execute(this.editorData);

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
