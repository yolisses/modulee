<script lang="ts">
	import type { Vector } from 'nodes-editor';
	import AddNodeCategoryItems from './AddNodeCategoryItems.svelte';
	import { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';
	import AddNodeMenuSearchInput from './AddNodeMenuSearchInput.svelte';
	import AddNodeSearchNodeItems from './AddNodeSearchNodeItems.svelte';

	interface Props {
		closeModal: () => void;
		screenPosition: Vector;
	}

	const { closeModal, screenPosition }: Props = $props();
	const addNodeMenuLogic = new AddNodeMenuLogic(closeModal, screenPosition);
</script>

<!-- TODO consider adding a descriptive text like "Add node" -->
<div
	class="flex max-h-[75vh] flex-col rounded bg-zinc-700 shadow-lg shadow-black/50 outline-1 outline-zinc-800"
>
	<AddNodeMenuSearchInput {addNodeMenuLogic} />
	<div class="scroll-small flex flex-col overflow-auto overscroll-contain whitespace-nowrap">
		{#if addNodeMenuLogic.searchText}
			<AddNodeSearchNodeItems {addNodeMenuLogic} />
		{:else}
			<AddNodeCategoryItems />
		{/if}
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
