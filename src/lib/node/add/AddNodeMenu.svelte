<script lang="ts">
	import { AddNodeCommand } from '$lib/commands/AddNodeCommand.js';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getGroupIdContext } from '$lib/group/groupIdContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import type { Vector } from 'nodes-editor';
	import { createNodeData } from './createNodeData.js';
	import { devNodeTypes } from './devNodeTypes.js';
	import type { NodeType } from './NodeType.js';
	import NodeTypeList from './NodeTypeList.svelte';

	interface Props {
		closeModal: () => void;
		screenPosition: Vector;
	}

	const spaceContext = getSpaceContext();
	const editorContext = getEditorContext();
	const groupIdContext = getGroupIdContext();
	const projectDataContext = getProjectDataContext();

	const { closeModal, screenPosition }: Props = $props();

	function handleTypeClick(nodeType: NodeType) {
		const dataPosition = spaceContext.space.getDataPosition(screenPosition).round();
		const nodeData = createNodeData(nodeType, groupIdContext.groupId, dataPosition);
		const addNodeCommand = new AddNodeCommand({
			id: createId(),
			type: 'AddNodeCommand',
			details: { node: nodeData },
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(addNodeCommand);
		closeModal();
	}
</script>

<div class="flex max-h-[75vh] flex-col rounded bg-zinc-700">
	<div class="border-b border-black/25 p-2">Add node</div>
	<div class="scroll-small flex flex-col overflow-auto whitespace-nowrap">
		<NodeTypeList nodeTypes={devNodeTypes} onTypeClick={handleTypeClick} />
	</div>
</div>

<style>
	/* Scrollbar */
	/* width */
	.scroll-small::-webkit-scrollbar {
		width: 0.25rem;
		height: 0.25rem;
	}
</style>
