<script lang="ts">
	import AddNodeCategoryItems from './AddNodeCategoryItems.svelte';
	import AddNodeMenuSearchInput from './AddNodeMenuSearchInput.svelte';
	import AddNodeSearchNodeItems from './AddNodeSearchNodeItems.svelte';

	let searchText = $state('');
</script>

<!-- TODO consider adding a descriptive text like "Add node" -->
<div class="menu-container flex flex-col">
	<AddNodeMenuSearchInput bind:searchText />
	<div
		class="scroll-small flex flex-col overflow-auto overscroll-contain whitespace-nowrap select-none"
	>
		{#if searchText}
			<AddNodeSearchNodeItems {searchText} />
		{:else}
			<AddNodeCategoryItems />
		{/if}
	</div>
</div>
