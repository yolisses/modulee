<script lang="ts">
	import { page } from '$app/state';
	import type { Group } from '$lib/data/Group.svelte';

	interface Props {
		group: Group;
	}

	const { group }: Props = $props();

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();
	}
</script>

<a
	draggable="false"
	title="Edit group"
	href="{page.url}/{group.id}"
	style:padding-inline="0.25lh"
	onpointerdown={handlePointerDown}
	class="overflow-and-ellipsis hover-bg flex flex-1 flex-row items-center text-blue-300"
>
	{group.name}
</a>
