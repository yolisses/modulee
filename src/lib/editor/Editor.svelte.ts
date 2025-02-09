import { RedoCommand } from '$lib/commands/RedoCommand';
import { UndoCommand } from '$lib/commands/UndoCommand';
import { Group } from '$lib/data/Group.svelte';
import { GroupNode } from '$lib/data/GroupNode.svelte';
import { Node } from '$lib/data/Node.svelte';
import type { NodeData } from '$lib/data/NodeData';
import type { Command } from './Command';
import type { EditorData } from './EditorData';

export class Editor {
	nodes: Node[] = $state([]);
	groups: Group[] = $state([]);
	onExecute?: (command: Command) => void;
	// TODO consider removing these if the commands are never shown
	history: Command[] = $state([]);
	undoneHistory: Command[] = $state([]);

	constructor(private editorData: EditorData) {
		this.recalculate();
	}

	createNode(nodeData: NodeData, groups: Group[]) {
		if (nodeData.type === 'GroupNode') {
			return new GroupNode(nodeData, groups);
		} else {
			return new Node(nodeData);
		}
	}

	recalculate() {
		this.history = this.editorData.history;
		this.undoneHistory = this.editorData.undoneHistory;
		this.groups = this.editorData.groups.map((groupData) => new Group(groupData));

		this.nodes = this.editorData.nodes.map((nodeData) => this.createNode(nodeData, this.groups));

		this.groups.forEach((group) => group.setNodesFromOptions(this.nodes));

		this.nodes.forEach((node) => {
			if (node instanceof GroupNode) {
				node.updateInputs();
			}
		});

		const outputs = this.nodes.map((node) => node.output);
		const inputs = this.nodes.flatMap((node) => node.inputs);

		inputs.forEach((input) => {
			if (!input.connectedOutput) return;
			const connectedOutput = outputs.find((output) => {
				return output.id === input.connectedOutput?.id;
			});
			if (!connectedOutput) return;
			input.connectedOutput = connectedOutput;
		});
	}

	getIsUndoOrRedo(command: Command) {
		return command instanceof UndoCommand || command instanceof RedoCommand;
	}

	execute(command: Command<any>) {
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
