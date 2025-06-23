import { getAreInputPathsEqual } from '$lib/data/getAreInputPathsEqual';
import type { GraphRegistry } from '$lib/data/GraphRegistry';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { NODE_ITEM_WIDTH_PLUS_GAP } from '$lib/node/NODE_ITEM_WIDTH_PLUS_GAP';
import { SetConnectionCommand } from '../connection/SetConnectionCommand';
import { AddNodeCommand } from '../node/AddNodeCommand';
import { MoveNodeCommand } from '../node/MoveNodeCommand';
import { mockCommandData } from '../test/mockNodeData';
import { SetConnectionsCommand } from './ConnectAudioInputsCommand';

/**
 * Uses an effect following these steps:
 *
 * 1. Move the output node to add space to the effect module node.
 * 2. Add the module node with the effect external module refference.
 * 3. Connect the audio input nodes from the effect module node to the node
 *    connected to the output node input if exists.
 * 4. Connect the output node to the effect module node.
 */
export class UseEffectCommand extends EditorCommand<{
	connectionId: string;
	moduleNodeId: string;
	outputNodeId: string;
	externalModule: ExternalModuleData;
	audioInputConnectionIds: Record<string, string>;
}> {
	static name = 'UseEffectCommand';

	moveOutputNode!: MoveNodeCommand; // 1
	addModuleNode!: AddNodeCommand; // 2
	connectAudioInputs?: SetConnectionsCommand; // 3
	connectToOutputNode!: SetConnectionCommand; // 4

	execute(graphRegistry: GraphRegistry): void {
		const { connectionId, moduleNodeId, outputNodeId, externalModule, audioInputConnectionIds } =
			this.details;

		const outputNodeData = graphRegistry.nodes.get(outputNodeId);
		const moduleNodePosition = structuredClone(outputNodeData.position);
		const { internalModuleId } = outputNodeData;

		// 1. Move the output node to add space to the effect module node.
		this.moveOutputNode = new MoveNodeCommand(
			mockCommandData({
				nodeId: outputNodeId,
				delta: {
					x: NODE_ITEM_WIDTH_PLUS_GAP,
					y: 0,
				},
			}),
		);
		this.moveOutputNode.execute(graphRegistry);

		// 2. Add the module node with the effect external module refference.
		this.addModuleNode = new AddNodeCommand(
			mockCommandData({
				node: {
					id: moduleNodeId,
					internalModuleId,
					type: 'ModuleNode',
					unconnectedInputValues: {},
					position: moduleNodePosition,
					extras: {
						moduleReference: {
							type: 'external',
							id: externalModule.id,
						},
					},
				},
			}),
		);
		this.addModuleNode.execute(graphRegistry);

		// 3. Connect the audio input nodes from the effect module node to the
		//    node connected to the output node input if exists.
		const outputNodeInputConntection = graphRegistry.connections.values().find((connectionData) => {
			return getAreInputPathsEqual(connectionData.inputPath, {
				nodeId: outputNodeId,
				inputKey: 'input',
			});
		});
		if (outputNodeInputConntection) {
			this.connectAudioInputs = new SetConnectionsCommand(
				mockCommandData({
					moduleNodeId,
					externalModule,
					audioInputConnectionIds,
					targetNodeId: outputNodeInputConntection.targetNodeId,
				}),
			);
			this.connectAudioInputs.execute(graphRegistry);
		}

		// 4. Connect the output node to the effect module node.
		this.connectToOutputNode = new SetConnectionCommand(
			mockCommandData({
				connection: {
					id: connectionId,
					targetNodeId: moduleNodeId,
					inputPath: {
						inputKey: 'input',
						nodeId: outputNodeId,
					},
				},
			}),
		);
		this.connectToOutputNode.execute(graphRegistry);
	}

	undo(graphRegistry: GraphRegistry): void {
		this.connectToOutputNode.undo(graphRegistry);
		this.connectAudioInputs?.undo(graphRegistry);
		this.addModuleNode.undo(graphRegistry);
		this.moveOutputNode.undo(graphRegistry);
	}
}
