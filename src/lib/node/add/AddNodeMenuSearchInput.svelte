<script lang="ts">
	import { getIsMobile } from '$lib/node/add/getIsMobile';
	import { onMount } from 'svelte';
	import { AddNodeHandler } from './AddNodeHandler';
	import { getNodeDefinitionsBySearchText } from './getNodeDefinitionsBySearchText';

	interface Props {
		searchText: string;
	}

	let element: HTMLElement;
	const addNodeHandler = new AddNodeHandler();
	let { searchText = $bindable() }: Props = $props();

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key !== 'Enter') return;
		if (searchText.length === 0) return;
		const nodeDefinition = getNodeDefinitionsBySearchText(searchText)[0];
		if (!nodeDefinition) return;
		addNodeHandler.handleNodeDefinitionSelect(nodeDefinition);
	}

	onMount(() => {
		if (!getIsMobile()) {
			element.focus();
		}
	});
</script>

<input
	type="search"
	bind:this={element}
	placeholder="Search"
	class="common-input"
	bind:value={searchText}
	onkeydown={handleKeyDown}
/>
