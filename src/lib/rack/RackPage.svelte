<script lang="ts">
	import { getGraphContext } from '$lib/graph/graphContext';
	import { getProjectNavbarSelectionContext } from '$lib/project/projectNavbarSelectionContext';
	import RackModuleItem from './RackModuleItem.svelte';

	const graphContext = getGraphContext();

	const projectNavbarSelectionContext = getProjectNavbarSelectionContext();
	projectNavbarSelectionContext.projectNavbarSelection = 'rack';
</script>

<svelte:head>
	<title>Rack - Modulee</title>
</svelte:head>

{#each graphContext.graph.internalModules.values() as internalModule (internalModule.id)}
	<RackModuleItem {internalModule} />
{/each}
