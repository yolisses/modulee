<script lang="ts">
	import { SetGroupNodeTargetGroupIdCommand } from '$lib/commands/node/SetGroupNodeTargetGroupIdCommand';
	import { createId } from '$lib/data/createId.js';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { Group } from '$lib/data/Group.svelte';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName.js';

	interface Props {
		groupNodeId: string;
		closeModal: () => void;
	}

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	const { closeModal, groupNodeId }: Props = $props();

	function handleTypeClick(group: Group) {
		const addNodeCommand = new SetGroupNodeTargetGroupIdCommand({
			id: createId(),
			type: 'SetGroupNodeTargetGroupIdCommand',
			details: { targetGroupId: group.id, groupNodeId: groupNodeId },
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(addNodeCommand);
		closeModal();
	}
</script>

<div class="flex max-h-[75vh] flex-col rounded bg-zinc-700 outline outline-1 outline-zinc-800">
	<div class="border-b border-black/25 p-2">Select group</div>
	<div class="scroll-small flex flex-col overflow-auto whitespace-nowrap">
		<BasicList
			{getId}
			{getName}
			onClick={handleTypeClick}
			values={graphContext.graph.groups.values()}
		/>
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
