<script lang="ts">
	import { NotImplementedError } from '$lib/NotImplementedError';
	import { AddNodeMenuSearchState } from './AddNodeMenuSearchState.svelte';

	interface Props {
		addNodeMenuSearchState: AddNodeMenuSearchState;
	}

	const { addNodeMenuSearchState }: Props = $props();

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		if (addNodeMenuSearchState.searchText.length === 0) return;
		const option = addNodeMenuSearchState.getOptions()[0];
		if (!option) return;

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
	onkeydown={handleKeyDown}
	bind:value={addNodeMenuSearchState.searchText}
/>
