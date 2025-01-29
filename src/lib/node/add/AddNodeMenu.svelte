<script lang="ts">
	import { AddNodeCommand } from '$lib/commands/AddNodeCommand.js';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getGroupIdContext } from '$lib/group/groupIdContext.js';
	import { getProjectIdContext } from '$lib/project/projectIdContext.js';
	import type { Space } from '$lib/space/Space.js';
	import type { Vector } from 'nodes-editor';
	import { createNodeData } from './createNodeData.js';
	import { devNodeTypes } from './devNodeTypes.js';
	import type { NodeType } from './NodeType.js';
	import NodeTypeList from './NodeTypeList.svelte';

	interface Props {
		space: Space;
		closeModal: () => void;
		screenPosition: Vector;
	}

	const editorContext = getEditorContext();
	const groupIdContext = getGroupIdContext();
	const projectIdContext = getProjectIdContext();
	const { space, closeModal, screenPosition }: Props = $props();

	function handleTypeClick(nodeType: NodeType) {
		const dataPosition = space.getDataPosition(screenPosition).round();
		const nodeData = createNodeData(nodeType, groupIdContext.groupId, dataPosition);
		const addNodeCommand = new AddNodeCommand({
			id: createId(),
			type: 'AddNodeCommand',
			details: { node: nodeData },
			createdAt: new Date().toJSON(),
			projectId: projectIdContext.projectId,
		});
		editorContext.editor.execute(addNodeCommand);
		closeModal();
	}
</script>

<div class="max-h-[75vh] rounded bg-zinc-700">
	<div class="border-b border-black p-2">Add node</div>
	<div class="scroller overflow-auto">
		<NodeTypeList nodeTypes={devNodeTypes} onTypeClick={handleTypeClick} />
	</div>
</div>

<style>
	/* Scrollbar */
	/* width */
	.scroller::-webkit-scrollbar {
		width: 0.25rem;
		height: 0.25rem;
	}
</style>
