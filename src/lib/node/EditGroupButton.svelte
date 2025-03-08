<script lang="ts">
	import type { Group } from '$lib/data/Group.svelte';
	import { getProjectDataContext } from '$lib/project/projectDataContext';

	interface Props {
		group: Group;
	}

	const { group }: Props = $props();
	const projectDataContext = getProjectDataContext();
	const href = $derived(`/projects/${projectDataContext.projectData.id}/groups/${group.id}`);

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}
</script>

<a
	{href}
	draggable="false"
	title="Edit group"
	style:padding-inline="0.25lh"
	onpointerdown={handlePointerDown}
	class="overflow-and-ellipsis hover-bg flex flex-1 flex-row items-center text-blue-300"
>
	{group.name}
</a>
