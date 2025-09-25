import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InternalModuleData } from '$lib/module/internalModule/InternalModuleData';
import type { NodeData } from '$lib/node/data/NodeData';
import { AddNodeCommand } from '../node/create/AddNodeCommand';
import { mockCommandData } from '../test/mockNodeData';
import { AddInternalModuleCommand } from './AddInternalModuleCommand';

export class AddInternalModuleWithOutputNodeCommand extends EditorCommand<{
	internalModule: InternalModuleData;
	node: NodeData;
}> {
	static name = 'AddInternalModuleWithOutputNodeCommand';
	addInternalModuleCommand!: AddInternalModuleCommand;
	addNodeCommand!: AddNodeCommand;

	execute(graphRegistry: GraphRegistry): void {
		const { internalModule, node } = this.details;
		this.addInternalModuleCommand = new AddInternalModuleCommand(
			mockCommandData({ internalModule }),
		);
		this.addInternalModuleCommand.execute(graphRegistry);

		this.addNodeCommand = new AddNodeCommand(mockCommandData({ node }));
		this.addNodeCommand.execute(graphRegistry);
	}

	undo(graphRegistry: GraphRegistry): void {
		this.addInternalModuleCommand.undo(graphRegistry);
		this.addNodeCommand.undo(graphRegistry);
	}
}
