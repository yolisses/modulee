import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { VectorData } from '$lib/data/VectorData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { NODE_ITEM_WIDTH_PLUS_GAP } from '$lib/node/NODE_ITEM_WIDTH_PLUS_GAP';
import { NotImplementedError } from '$lib/NotImplementedError';
import { SetConnectionCommand } from '../connection/SetConnectionCommand';
import { AddNodeCommand } from '../node/AddNodeCommand';
import { MoveNodeCommand } from '../node/MoveNodeCommand';
import { mockCommandData } from '../test/mockNodeData';
import { ConnectAudioInputsCommand } from './ConnectAudioInputsCommand';
import { SetExternalModuleReferenceCommand } from './SetExternalModuleReferenceCommand';

/**
 * Uses an effect following these steps:
 *
 * 1. Add the external module reference if not present.
 * 2. Move the output node to add space to the effect module node.
 * 3. Add the module node with the effect external module refference.
 * 4. Connect the audio input nodes from the effect module node to the node
 *    connected to the output node input if exists.
 * 5. Connect the output node to the effect module node.
 */
export class UseEffectCommand extends EditorCommand<{
	connectionId: string;
	moduleNodeId: string;
	outputNodeId: string;
	internalModuleId: string;
	moduleNodePosition: VectorData;
	externalModule: ExternalModuleData;
	audioInputConnectionIds: Record<string, string>;
}> {
	static name = 'UseEffectCommand';

	addExternalModuleReference!: SetExternalModuleReferenceCommand; // 1
	moveOutputNode!: MoveNodeCommand; // 2
	addModuleNode!: AddNodeCommand; // 3
	connectAudioInputs!: ConnectAudioInputsCommand; // 4
	connectToOutputNode!: SetConnectionCommand; // 5

	execute(graphRegistry: GraphRegistry): void {
		const {
			connectionId,
			moduleNodeId,
			outputNodeId,
			externalModule,
			internalModuleId,
			moduleNodePosition,
			audioInputConnectionIds,
		} = this.details;

		// 1. Add the external module reference if not present.
		this.addExternalModuleReference = new SetExternalModuleReferenceCommand(
			mockCommandData({
				externalModuleReference: {
					type: 'external',
					id: externalModule.id,
				},
			}),
		);
		this.addExternalModuleReference.execute(graphRegistry);

		// 2. Move the output node to add space to the effect module node.
		this.moveOutputNode = new MoveNodeCommand(
			mockCommandData({
				nodeId: outputNodeId,
				delta: { x: NODE_ITEM_WIDTH_PLUS_GAP, y: 0 },
			}),
		);
		this.moveOutputNode.execute(graphRegistry);

		// 3. Add the module node with the effect external module refference.
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

		// 4. Connect the audio input nodes from the effect module node to the
		//    node connected to the output node input if exists.
		throw new NotImplementedError();
		// this.connectAudioInputs = new ConnectAudioInputsCommand(
		// 	mockCommandData({
		// 		moduleNodeId,
		// 		externalModuleData,
		// 		audioInputConnectionIds,
		// 	}),
		// );

		// 5. Connect the output node to the effect module node.
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
		this.addModuleNode.undo(graphRegistry);
		this.connectToOutputNode.undo(graphRegistry);
		this.addExternalModuleReference.undo(graphRegistry);
	}
}
