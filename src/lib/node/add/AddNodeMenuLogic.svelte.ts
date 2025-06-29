import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand';
import { createId } from '$lib/data/createId';
import { getEditorContext } from '$lib/editor/editorContext';
import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
import { getProjectDataContext } from '$lib/project/ui/projectDataContext';
import { getSpaceContext } from '$lib/space/spaceContext';
import type { Vector } from 'nodes-editor';
import { getNodeDefinitionName } from '../definitions/getNodeDefinitionName';
import type { NodeDefinition } from '../definitions/NodeDefinition';
import { nodeDefinitions } from '../definitions/nodeDefinitions';
import { createNodeData } from './createNodeData';

export class AddNodeMenuLogic {
	searchText = $state('');
	spaceContext = getSpaceContext();
	editorContext = getEditorContext();
	projectDataContext = getProjectDataContext();
	internalModuleIdContext = getInternalModuleIdContext();

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
