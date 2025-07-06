<script lang="ts">
	import { AddNodeHandler } from './AddNodeHandler';
	import { getNodeDefinitionsBySearchText } from './getNodeDefinitionsBySearchText';

	interface Props {
		searchText: string;
	}

	const addNodeHandler = new AddNodeHandler();
	let { searchText = $bindable() }: Props = $props();

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		if (searchText.length === 0) return;
		const nodeDefinition = getNodeDefinitionsBySearchText(searchText)[0];
		if (!nodeDefinition) return;
		addNodeHandler.handleNodeDefinitionSelect(nodeDefinition);
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
