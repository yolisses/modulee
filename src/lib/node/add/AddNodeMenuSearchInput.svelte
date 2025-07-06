<script lang="ts">
	import { getNodeDefinitionsBySearchText } from './getNodeDefinitionsBySearchText';
	import { handleNodeDefinitionSelect } from './handleNodeDefinitionSelect';

	interface Props {
		searchText: string;
	}

	let { searchText = $bindable() }: Props = $props();

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		if (searchText.length === 0) return;
		const nodeDefinition = getNodeDefinitionsBySearchText(searchText)[0];
		if (!nodeDefinition) return;
		handleNodeDefinitionSelect(nodeDefinition);
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
