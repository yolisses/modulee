import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';
import type { NodeData } from '$lib/node/data/NodeData';
import { SetConnectionCommand } from '../../connection/SetConnectionCommand';
import { mockCommandData } from '../../test/mockNodeData';
import { AddNodeCommand } from './AddNodeCommand';

export class AddConnectedNodeCommand extends EditorCommand<{
	node: NodeData;
	inputPath: InputPath;
	connectionId: string;
}> {
	static name = 'AddConnectedNodeCommand';
	addNodeCommand!: AddNodeCommand;
	setConnectionCommand!: SetConnectionCommand;

	execute(graphRegistry: GraphRegistry): void {
		const { node, inputPath, connectionId } = this.details;

		this.addNodeCommand = new AddNodeCommand(mockCommandData({ node }));
		this.addNodeCommand.execute(graphRegistry);

		this.setConnectionCommand = new SetConnectionCommand(
			mockCommandData({ connection: { inputPath, id: connectionId, targetNodeId: node.id } }),
		);
		this.setConnectionCommand.execute(graphRegistry);
	}

	undo(graphRegistry: GraphRegistry): void {
		this.addNodeCommand.undo(graphRegistry);
		this.setConnectionCommand.undo(graphRegistry);
	}
}
