<script lang="ts">
	import type { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';

	interface Props {
		addNodeMenuLogic: AddNodeMenuLogic;
	}

	const { addNodeMenuLogic }: Props = $props();

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		if (addNodeMenuLogic.searchText.length === 0) return;
		const option = addNodeMenuLogic.getOptions()[0];
		if (!option) return;
		addNodeMenuLogic.handleNodeDefinitionSelect(option);
	}
</script>

<!-- svelte-ignore a11y_autofocus -->
<input
	autofocus
	type="search"
	placeholder="Search"
	class="common-input"
	onkeydown={handleKeyDown}
	bind:value={addNodeMenuLogic.searchText}
/>
