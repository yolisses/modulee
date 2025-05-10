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
<div class="menu-container flex flex-col">
	<AddNodeMenuSearchInput {addNodeMenuLogic} />
	<div
		class="scroll-small flex flex-col overflow-auto overscroll-contain whitespace-nowrap select-none"
	>
		{#if addNodeMenuLogic.searchText}
			<AddNodeSearchNodeItems {addNodeMenuLogic} />
		{:else}
			<AddNodeCategoryItems {addNodeMenuLogic} />
		{/if}
	</div>
</div>
