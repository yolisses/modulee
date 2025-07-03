import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand';
import { editorContextKey } from '$lib/editor/editorContext';
import { createId } from '$lib/global/createId';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
import { spaceContextKey } from '$lib/space/spaceContext';
import type { Vector } from 'nodes-editor';
import { getNodeDefinitionName } from '../definitions/getNodeDefinitionName';
import type { NodeDefinition } from '../definitions/NodeDefinition';
import { nodeDefinitions } from '../definitions/nodeDefinitions';
import { createNodeData } from './createNodeData';

export class AddNodeMenuLogic {
	searchText = $state('');
	spaceContext = getRequiredContext(spaceContextKey);
	editorContext = getRequiredContext(editorContextKey);
	projectDataContext = getRequiredContext(projectDataContextKey);
	internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);

	constructor(
		public closeModal: () => void,
		public screenPosition: Vector,
	) {}

	getOptions() {
		return nodeDefinitions.filter((nodeDefinition) => {
			return getNodeDefinitionName(nodeDefinition)
				.toLowerCase()
				.includes(this.searchText.toLowerCase());
		});
	}

	handleNodeDefinitionSelect = (nodeDefinition: NodeDefinition) => {
		const dataPosition = this.spaceContext.space.getDataPosition(this.screenPosition).floor();
		const nodeData = createNodeData(
			nodeDefinition,
			this.internalModuleIdContext.internalModuleId,
			dataPosition,
		);
		const addNodeCommand = new AddNodeCommand({
			id: createId(),
			type: 'AddNodeCommand',
			details: { node: nodeData },
			createdAt: new Date().toJSON(),
			projectId: this.projectDataContext.projectData.id,
		});
		this.editorContext.editor.execute(addNodeCommand);
		this.closeModal();
	};
}
