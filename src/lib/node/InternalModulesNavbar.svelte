<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';

	const graphContext = getGraphContext();
	const projectDataContext = getProjectDataContext();
	const internalModuleIdContext = getInternalModuleIdContext();

	const projectId = $derived(projectDataContext.projectData.id);
	const internalModules = $derived(graphContext.graph.internalModules.values());
</script>

{#if internalModules.length > 1}
	<div class="flex flex-row overflow-auto border-b-2 border-black/50">
		{#each graphContext.graph.internalModules.values() as internalModule (internalModule.id)}
			<a
				title={internalModule.name}
				href="/projects/{projectId}/internalModules/{internalModule.id}/graph"
				class="horizontal-tab block max-w-[10rem] overflow-hidden text-ellipsis whitespace-nowrap"
				class:horizontal-tab-selected={internalModuleIdContext.internalModuleId ===
					internalModule.id}
			>
				{internalModule.name}
			</a>
		{/each}
	</div>
{/if}
