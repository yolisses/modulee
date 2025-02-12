<script lang="ts">
	import SelectGroupMenuWrapper from './SelectGroupMenuWrapper.svelte';

	interface Props {
		groupNodeId: string;
	}

	const { groupNodeId }: Props = $props();

	let mouseEvent = $state<MouseEvent>();

	function handleClick(e: MouseEvent) {
		e.stopPropagation();
		mouseEvent = e;
	}
</script>

<button
	onclick={handleClick}
	style:padding-inline="0.25lh"
	class="overflow-and-ellipsis opacity-50"
>
	Select group
</button>
<SelectGroupMenuWrapper {mouseEvent} {groupNodeId} />
