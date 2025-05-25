<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import RackModuleItem from './RackModuleItem.svelte';

	const graphContext = getGraphContext();
</script>

<svelte:head>
	<title>Rack - Modulee</title>
</svelte:head>

{#each graphContext.graph.internalModules.values() as internalModule (internalModule.id)}
	<RackModuleItem {internalModule} />
{/each}
