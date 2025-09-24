import { AddConnectedNodeCommand } from '$lib/commands/node/create/AddConnectedNodeCommand';
import { AddNodeCommand } from '$lib/commands/node/create/AddNodeCommand';
import type { EditorCommand } from '$lib/editor/EditorCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import type { NodeDefinition } from '../definitions/NodeDefinition';
import { addNodeMenuParamsContextKey } from './addNodeMenuParamsContext';
import { createNodeData } from './createNodeData';

export class AddNodeHandler {
	addNodeMenuParamsContext = getRequiredContext(addNodeMenuParamsContextKey);
	editorContext = getRequiredContext(editorContextKey);
	internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);
	projectDataContext = getRequiredContext(projectDataContextKey);

	handleNodeDefinitionSelect = (nodeDefinition: NodeDefinition) => {
		const { addNodeMenuParams } = this.addNodeMenuParamsContext;
		if (!addNodeMenuParams) return;

		const dataPosition = addNodeMenuParams.position.floor();
		const nodeData = createNodeData(
			nodeDefinition,
			this.internalModuleIdContext.internalModuleId,
			dataPosition,
		);

		let command: EditorCommand;
		if (addNodeMenuParams.input) {
			const { output, input } = addNodeMenuParams;

			const outputParams = output
				? { targetNodeId: output?.id, outputConnectionId: createId() }
				: undefined;

			const inputParams = input
				? { inputPath: input.inputPath, inputConnectionId: createId() }
				: undefined;

			command = new AddConnectedNodeCommand({
				id: createId(),
				createdAt: new Date().toJSON(),
				type: 'AddConnectedNodeCommand',
				projectId: this.projectDataContext.projectData.id,
				details: { node: nodeData, inputParams, outputParams },
			});
		} else {
			command = new AddNodeCommand({
				id: createId(),
				type: 'AddNodeCommand',
				details: { node: nodeData },
				createdAt: new Date().toJSON(),
				projectId: this.projectDataContext.projectData.id,
			});
		}
		this.editorContext.editor.execute(command);
		this.addNodeMenuParamsContext.addNodeMenuParams = undefined;
	};
}
