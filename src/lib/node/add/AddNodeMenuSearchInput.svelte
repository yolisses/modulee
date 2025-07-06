<script lang="ts">
	import { NotImplementedError } from '$lib/NotImplementedError';
	import { getNodeDefinitionsBySearchText } from './getNodeDefinitionsBySearchText';

	interface Props {
		searchText: string;
	}

	let { searchText = $bindable() }: Props = $props();

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		if (searchText.length === 0) return;
		const nodeDefinition = getNodeDefinitionsBySearchText(searchText)[0];
		if (!nodeDefinition) return;

		// addNodeMenuSearchState.handleNodeDefinitionSelect(option);
		throw new NotImplementedError();
	}
</script>

<!-- svelte-ignore a11y_autofocus -->
<input
	autofocus
	type="search"
	placeholder="Search"
	class="common-input"
	bind:value={searchText}
	onkeydown={handleKeyDown}
/>
