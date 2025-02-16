import { RedoCommand } from '$lib/commands/editor/RedoCommand';
import { UndoCommand } from '$lib/commands/editor/UndoCommand';
import { Connection } from '$lib/data/Connection';
import type { Connector } from '$lib/data/Connector';
import type { GraphData } from '$lib/data/GraphData';
import { Group } from '$lib/data/Group.svelte';
import { GroupNode } from '$lib/data/GroupNode.svelte';
import { Node } from '$lib/data/Node.svelte';
import type { Command } from './Command';
import type { EditorData } from './EditorData';
import { ReactiveById } from './ReactiveById.svelte';

export class Editor {
	nodes = new ReactiveById<Node>();
	groups = new ReactiveById<Group>();
	connectors = new ReactiveById<Connector>();
	connections = new ReactiveById<Connection>();
	history: Command[] = $state()!;
	undoneHistory: Command[] = $state()!;
	onExecute?: (command: Command) => void;

	constructor(
		private _graphData: GraphData,
		private _editorData: EditorData,
	) {
		this.recalculate();
	}

	get graphData() {
		return this._graphData;
	}

	get editorData() {
		return this._editorData;
	}

	// TODO consider moving this creation step to a separate function, since all
	// the parts are recreated instead of edited.
	recalculate() {
		const { editorData, graphData } = this;
		// TODO check if using history from editorData makes sense.
		this.history = editorData.history;
		this.undoneHistory = editorData.undoneHistory;

		this.nodes.clear();
		this.groups.clear();
		this.connectors.clear();
		this.connections.clear();

		graphData.nodes.values().forEach((nodeData) => {
			let node: Node;
			if (nodeData.type === 'GroupNode' || nodeData.type === 'GroupVoicesNode') {
				node = new GroupNode(nodeData, graphData.connections);
			} else {
				node = new Node(nodeData, graphData.connections);
			}
			this.nodes.add(node);
		});

		graphData.groups.values().forEach((groupData) => {
			const group = new Group(groupData, this.nodes);
			this.groups.add(group);
		});

		this.nodes.values().forEach((node) => {
			if (node instanceof GroupNode) {
				node.updateGroup(this.groups);
			}
		});

		graphData.connections.values().forEach((connectionData) => {
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
