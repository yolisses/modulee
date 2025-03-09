<script lang="ts">
	import type { Group } from '$lib/data/Group.svelte';
	import type { GroupNode } from '$lib/data/GroupNode.svelte';
	import SetTargetGroupButton from '$lib/group/SetTargetGroupButton.svelte';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		targetGroup: Group;
		groupNode: GroupNode;
	}

	const { groupNode, targetGroup }: Props = $props();
	const projectDataContext = getProjectDataContext();
	const href = $derived(`/projects/${projectDataContext.projectData.id}/groups/${targetGroup.id}`);

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}
</script>

<div class="hover-bg flex w-full flex-row">
	<a
		{href}
		draggable="false"
		style:padding-inline="0.25lh"
		onpointerdown={handlePointerDown}
		class="overflow-hidden text-ellipsis text-nowrap text-blue-300"
	>
		{targetGroup.name}
	</a>
	<SetTargetGroupButton groupNodeId={groupNode.id}>
		<Fa icon={faEdit} title="Edit group" />
	</SetTargetGroupButton>
</div>
