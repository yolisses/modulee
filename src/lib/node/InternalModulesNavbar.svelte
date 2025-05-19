<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import InternalModulesNavbarItem from './InternalModulesNavbarItem.svelte';

	const graphContext = getGraphContext();
	const internalModules = $derived(graphContext.graph.internalModules.values());
</script>

{#if internalModules.length > 1}
	<div class="flex flex-row overflow-auto border-b-2 border-black/50">
		{#each graphContext.graph.internalModules.values() as internalModule (internalModule.id)}
			<InternalModulesNavbarItem {internalModule} />
		{/each}
	</div>
{/if}
