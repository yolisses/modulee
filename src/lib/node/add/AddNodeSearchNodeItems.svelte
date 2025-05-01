<script lang="ts">
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getName } from '$lib/ui/getName';
	import type { AddNodeMenuLogic } from './AddNodeMenuLogic.svelte';
	import { getNodeTypeName } from './getNodeTypeName';

	interface Props {
		addNodeMenuLogic: AddNodeMenuLogic;
	}

	const { addNodeMenuLogic }: Props = $props();
	const options = $derived(addNodeMenuLogic.getOptions());
</script>

{#if options.length === 0}
	<div class="p-2 text-white/50">No options found for the search text</div>
{:else}
	<BasicList
		getId={getName}
		values={options}
		getName={getNodeTypeName}
		onClick={addNodeMenuLogic.handleNodeTypeSelect}
	/>
{/if}
