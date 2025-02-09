import { RedoCommand } from '$lib/commands/RedoCommand';
import { UndoCommand } from '$lib/commands/UndoCommand';
import { Connection } from '$lib/data/Connection';
import type { ConnectionData } from '$lib/data/ConnectionData';
import { Group } from '$lib/data/Group.svelte';
import { GroupNode } from '$lib/data/GroupNode.svelte';
import { Node } from '$lib/data/Node.svelte';
import type { NodeData } from '$lib/data/NodeData';
import type { Command } from './Command';
import type { EditorData } from './EditorData';

export class Editor {
	nodes: Node[] = $state()!;
	groups: Group[] = $state()!;
	history: Command[] = $state()!;
	undoneHistory: Command[] = $state()!;
	connections: Connection[] = $state()!;
	onExecute?: (command: Command) => void;

	constructor(private editorData: EditorData) {
		this.recalculate();
	}

	createNode(nodeData: NodeData, connectionsData: ConnectionData[], groups: Group[]): Node {
		if (nodeData.type === 'GroupNode') {
			return new GroupNode(nodeData, connectionsData, groups);
		} else {
			return new Node(nodeData, connectionsData);
		}
	}

	// TODO consider moving this creation step to a separate function, since all
	// the parts are recreated instead of edited.
	recalculate() {
		const { editorData } = this;
		// TODO check if using history from editorData makes sense.
		this.history = editorData.history;
		this.undoneHistory = editorData.undoneHistory;

		this.nodes = editorData.nodes.map((nodeData) => {
			return new Node(nodeData, editorData.connections);
		});

		this.groups = editorData.groups.map((groupData) => {
			return new Group(groupData, this.nodes);
		});

		this.connections = editorData.connections.map((connectionData) => {
			return new Connection(connectionData);
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
