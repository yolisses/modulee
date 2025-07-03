<script lang="ts">
	import RackModuleItem from './RackModuleItem.svelte';

	const graphContext = getRequiredContext(graphContextKey);

	const projectNavbarSelectionContext = getRequiredContext(projectNavbarSelectionContextKey);
	projectNavbarSelectionContext.projectNavbarSelection = 'rack';
</script>

<svelte:head>
	<title>Rack - Modulee</title>
</svelte:head>

{#each graphContext.graph.internalModules.values() as internalModule (internalModule.id)}
	<RackModuleItem {internalModule} />
{/each}
