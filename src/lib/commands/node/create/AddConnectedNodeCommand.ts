import { EditorCommand } from '$lib/editor/EditorCommand';
import type { GraphRegistry } from '$lib/graph/GraphRegistry';
import type { InputPath } from '$lib/input/InputPath';
import type { NodeData } from '$lib/node/data/NodeData';
import { nodeDefinitionsByName } from '$lib/node/definitions/nodeDefinitionsByName';
import { SetConnectionCommand } from '../../connection/SetConnectionCommand';
import { mockCommandData } from '../../test/mockNodeData';
import { AddNodeCommand } from './AddNodeCommand';

type InputParams = { inputPath: InputPath; inputConnectionId: string };
type OutputParams = { targetNodeId: string; outputConnectionId: string };

export class AddConnectedNodeCommand extends EditorCommand<{
	node: NodeData;
	inputParams?: InputParams;
	outputParams?: OutputParams;
}> {
	static name = 'AddConnectedNodeCommand';
	addNodeCommand!: AddNodeCommand;
	setInputConnectionCommand?: SetConnectionCommand;
	setOutputConnectionCommand?: SetConnectionCommand;

	execute(graphRegistry: GraphRegistry): void {
		const { node, inputParams, outputParams } = this.details;

		this.addNodeCommand = new AddNodeCommand(mockCommandData({ node }));
		this.addNodeCommand.execute(graphRegistry);

		if (inputParams) {
			const { inputPath, inputConnectionId } = inputParams;
			this.setInputConnectionCommand = new SetConnectionCommand(
				mockCommandData({
					connection: { inputPath, id: inputConnectionId, targetNodeId: node.id },
				}),
			);
			this.setInputConnectionCommand.execute(graphRegistry);
		}

		if (outputParams) {
			const { targetNodeId, outputConnectionId } = outputParams;
			const nodeDefinition = nodeDefinitionsByName[node.type];
			const firstInput = nodeDefinition.inputs.at(0);
			if (firstInput) {
				const inputPath: InputPath = { inputKey: firstInput.key, nodeId: node.id };
				this.setInputConnectionCommand = new SetConnectionCommand(
					mockCommandData({
						connection: { inputPath, id: outputConnectionId, targetNodeId },
					}),
				);
				this.setInputConnectionCommand.execute(graphRegistry);
			}
		}
	}

	undo(graphRegistry: GraphRegistry): void {
		this.addNodeCommand.undo(graphRegistry);
		this.setInputConnectionCommand?.undo(graphRegistry);
		this.setOutputConnectionCommand?.undo(graphRegistry);
	}
}
