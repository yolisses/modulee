import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { VectorData } from '$lib/data/VectorData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { NODE_ITEM_WIDTH_PLUS_GAP } from '$lib/node/NODE_ITEM_WIDTH_PLUS_GAP';
import { SetConnectionCommand } from '../connection/SetConnectionCommand';
import { AddNodeCommand } from '../node/AddNodeCommand';
import { MoveNodeCommand } from '../node/MoveNodeCommand';
import { mockCommandData } from '../test/mockNodeData';
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
}> {
	static name = 'UseEffectCommand';
	addNodeCommand!: AddNodeCommand;
	moveNodeCommand!: MoveNodeCommand;
	setConnectionCommand!: SetConnectionCommand;
	setExternalModuleReferenceCommand!: SetExternalModuleReferenceCommand;

	execute(graphRegistry: GraphRegistry): void {
		const {
			connectionId,
			moduleNodeId,
			outputNodeId,
			externalModule,
			internalModuleId,
			moduleNodePosition,
		} = this.details;

		// 1. Add the external module reference if not present.
		this.setExternalModuleReferenceCommand = new SetExternalModuleReferenceCommand(
			mockCommandData({
				externalModuleReference: {
					type: 'external',
					id: externalModule.id,
				},
			}),
		);
		this.setExternalModuleReferenceCommand.execute(graphRegistry);

		// 2. Move the output node to add space to the effect module node.
		this.moveNodeCommand = new MoveNodeCommand(
			mockCommandData({
				nodeId: outputNodeId,
				delta: { x: NODE_ITEM_WIDTH_PLUS_GAP, y: 0 },
			}),
		);
		this.moveNodeCommand.execute(graphRegistry);

		// 3. Add the module node with the effect external module refference.
		this.addNodeCommand = new AddNodeCommand(
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
		this.addNodeCommand.execute(graphRegistry);

		// 4. Connect the audio input nodes from the effect module node to the
		//    node connected to the output node input if exists.
		this.setConnectionCommand = new SetConnectionCommand(
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
		this.setConnectionCommand.execute(graphRegistry);

		// 5. Connect the output node to the effect module node.
	}

	undo(graphRegistry: GraphRegistry): void {
		this.addNodeCommand.undo(graphRegistry);
		this.setConnectionCommand.undo(graphRegistry);
		this.setExternalModuleReferenceCommand.undo(graphRegistry);
	}
}
