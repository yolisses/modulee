import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand';
import { createId } from '$lib/data/createId';
import { getEditorContext } from '$lib/editor/editorContext';
import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
import { getProjectDataContext } from '$lib/project/projectDataContext';
import { getSpaceContext } from '$lib/space/spaceContext';
import type { Vector } from 'nodes-editor';
import { createNodeData } from './createNodeData';
import { getNodeTypeName } from './getNodeTypeName';
import type { NodeType } from './NodeType';
import { nodeTypes } from './nodeTypes';

export class AddNodeMenuLogic {
	searchText = $state('');

	constructor(
		public closeModal: () => void,
		public screenPosition: Vector,
	) {}

	getOptions() {
		return nodeTypes.filter((nodeType) => {
			return getNodeTypeName(nodeType).toLowerCase().includes(this.searchText.toLowerCase());
		});
	}

	handleKeyDown = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		if (this.searchText.length === 0) return;
		const option = this.getOptions()[0];
		if (!option) return;
		this.handleNodeTypeSelect(option);
	};

	spaceContext = getSpaceContext();
	editorContext = getEditorContext();
	projectDataContext = getProjectDataContext();
	internalModuleIdContext = getInternalModuleIdContext();

	handleNodeTypeSelect = (nodeType: NodeType) => {
		const dataPosition = this.spaceContext.space.getDataPosition(this.screenPosition).floor();
		const nodeData = createNodeData(
			nodeType,
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
