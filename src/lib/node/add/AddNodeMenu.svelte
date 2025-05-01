<script lang="ts">
	import type { Vector } from 'nodes-editor';
	import AddNodeCategoryItems from './AddNodeCategoryItems.svelte';
	import { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';
	import AddNodeSearchNodeItems from './AddNodeSearchNodeItems.svelte';

	interface Props {
		closeModal: () => void;
		screenPosition: Vector;
	}

	const { closeModal, screenPosition }: Props = $props();

	const addNodeMenuLogic = new AddNodeMenuLogic(closeModal, screenPosition);

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		if (addNodeMenuLogic.searchText.length === 0) return;
		const option = addNodeMenuLogic.getOptions()[0];
		if (!option) return;
		addNodeMenuLogic.handleNodeTypeSelect(option);
	}
</script>

<!-- TODO consider adding a descriptive text like "Add node" -->
<div
	class="flex max-h-[75vh] flex-col rounded bg-zinc-700 shadow-lg shadow-black/50 outline-1 outline-zinc-800"
>
	<!-- svelte-ignore a11y_autofocus -->
	<input
		autofocus
		type="search"
		placeholder="Search"
		class="common-input"
		onkeydown={handleKeyDown}
		bind:value={addNodeMenuLogic.searchText}
	/>
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
