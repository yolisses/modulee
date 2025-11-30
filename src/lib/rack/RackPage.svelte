<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphContextKey } from '$lib/graph/graphContext';
	import { projectNavbarSelectionContextKey } from '$lib/project/projectNavbarSelectionContext';
	import RackModuleItem from './RackModuleItem.svelte';

	const graphContext = getRequiredContext(graphContextKey);

	const projectNavbarSelectionContext = getRequiredContext(projectNavbarSelectionContextKey);
	projectNavbarSelectionContext.projectNavbarSelection = 'rack';
</script>

<div class="overflow-auto">
	{#each graphContext.graph.internalModules.values() as internalModule (internalModule.id)}
		<RackModuleItem {internalModule} />
	{/each}
</div>
