<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import DotsMenuButton from '$lib/project/DotsMenuButton.svelte';
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
			<div
				class="horizontal-tab group flex max-w-[10rem] flex-row p-0"
				class:horizontal-tab-selected={internalModuleIdContext.internalModuleId ===
					internalModule.id}
			>
				<a
					title={internalModule.name}
					href="/projects/{projectId}/internalModules/{internalModule.id}/graph"
					class="block overflow-hidden p-2 text-ellipsis whitespace-nowrap"
				>
					{internalModule.name}
				</a>
				{#if internalModuleIdContext.internalModuleId === internalModule.id}
					<DotsMenuButton>
						<div>DEBUG</div>
						<!-- <RenameProjectButton projectData={item} />
						<DeleteProjectButton projectId={item.id} />
						<DownloadProjectButton projectData={item} /> -->
					</DotsMenuButton>
				{/if}
			</div>
		{/each}
	</div>
{/if}
