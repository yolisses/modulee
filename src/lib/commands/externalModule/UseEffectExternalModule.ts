import type { GraphRegistry } from '$lib/data/GraphRegistry';
import type { VectorData } from '$lib/data/VectorData';
import { EditorCommand } from '$lib/editor/EditorCommand';
import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
import { SetConnectionCommand } from '../connection/SetConnectionCommand';
import { AddNodeCommand } from '../node/AddNodeCommand';
import { mockCommandData } from '../test/mockNodeData';
import { SetExternalModuleReferenceCommand } from './SetExternalModuleReferenceCommand';

export class UseEffectExternalModule extends EditorCommand<{
	connectionId: string;
	moduleNodeId: string;
	outputNodeId: string;
	internalModuleId: string;
	moduleNodePosition: VectorData;
	externalModule: ExternalModuleData;
}> {
	static name = 'UseEffectExternalModule';
	addNodeCommand!: AddNodeCommand;
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

		this.setExternalModuleReferenceCommand = new SetExternalModuleReferenceCommand(
			mockCommandData({
				externalModuleReference: {
					type: 'external',
					id: externalModule.id,
					version: externalModule.version,
				},
			}),
		);

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
							version: externalModule.version,
						},
					},
				},
			}),
		);

		this.setConnectionCommand = new SetConnectionCommand(
			mockCommandData({
				connection: {
					id: connectionId,
					targetNodeId: moduleNodeId,
					inputPath: { inputKey: 'input', nodeId: outputNodeId },
				},
			}),
		);

		this.addNodeCommand.execute(graphRegistry);
		this.setConnectionCommand.execute(graphRegistry);
		this.setExternalModuleReferenceCommand.execute(graphRegistry);
	}

	undo(graphRegistry: GraphRegistry): void {
		this.addNodeCommand.undo(graphRegistry);
		this.setConnectionCommand.undo(graphRegistry);
		this.setExternalModuleReferenceCommand.undo(graphRegistry);
	}
}
