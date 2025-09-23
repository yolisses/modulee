import { AddConnectedNodeCommand } from '$lib/commands/node/create/AddConnectedNodeCommand';
import { AddNodeCommand } from '$lib/commands/node/create/AddNodeCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import type { NodeDefinition } from '../definitions/NodeDefinition';
import { addNodeMenuParamsContextKey } from './addNodeMenuParamsContext';
import { createNodeData } from './createNodeData';

export class AddNodeHandler {
	editorContext = getRequiredContext(editorContextKey);
	projectDataContext = getRequiredContext(projectDataContextKey);
	internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);
	addNodeMenuParamsContext = getRequiredContext(addNodeMenuParamsContextKey);

	handleNodeDefinitionSelect = (nodeDefinition: NodeDefinition) => {
		const { addNodeMenuParams } = this.addNodeMenuParamsContext;
		if (!addNodeMenuParams) return;

		const dataPosition = addNodeMenuParams.position.floor();
		const nodeData = createNodeData(
			nodeDefinition,
			this.internalModuleIdContext.internalModuleId,
			dataPosition,
		);

		const command = addNodeMenuParams.input
			? new AddConnectedNodeCommand({
					id: createId(),
					createdAt: new Date().toJSON(),
					type: 'AddConnectedNodeCommand',
					projectId: this.projectDataContext.projectData.id,
					details: {
						node: nodeData,
						connectionId: createId(),
						inputPath: addNodeMenuParams.input.inputPath,
					},
				})
			: new AddNodeCommand({
					id: createId(),
					type: 'AddNodeCommand',
					details: { node: nodeData },
					createdAt: new Date().toJSON(),
					projectId: this.projectDataContext.projectData.id,
				});

		this.editorContext.editor.execute(command);
		this.addNodeMenuParamsContext.addNodeMenuParams = undefined;
	};
}
