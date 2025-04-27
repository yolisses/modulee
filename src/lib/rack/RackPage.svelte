<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import RackModuleItem from './RackModuleItem.svelte';

	const graphContext = getGraphContext();
</script>

<div class="flex flex-col p-4">
	{#each graphContext.graph.internalModules.values() as internalModule (internalModule.id)}
		<RackModuleItem {internalModule} />
	{/each}
</div>
