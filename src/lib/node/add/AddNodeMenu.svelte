<script lang="ts">
	import AddNodeCategoryItems from './AddNodeCategoryItems.svelte';
	import AddNodeMenuSearchInput from './AddNodeMenuSearchInput.svelte';
	import { AddNodeMenuSearchState } from './AddNodeMenuSearchState.svelte';
	import AddNodeSearchNodeItems from './AddNodeSearchNodeItems.svelte';

	const addNodeMenuSearchState = new AddNodeMenuSearchState();
</script>

<!-- TODO consider adding a descriptive text like "Add node" -->
<div class="menu-container flex flex-col">
	<AddNodeMenuSearchInput {addNodeMenuSearchState} />
	<div
		class="scroll-small flex flex-col overflow-auto overscroll-contain whitespace-nowrap select-none"
	>
		{#if addNodeMenuSearchState.searchText}
			<AddNodeSearchNodeItems {addNodeMenuSearchState} />
		{:else}
			<AddNodeCategoryItems />
		{/if}
	</div>
</div>
