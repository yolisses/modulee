<script lang="ts">
	import { page } from '$app/state';
	import { getGraphContext } from '$lib/graph/graphContext';
	import { getProjectDataContext } from '$lib/project/ui/projectDataContext';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import type { ExternalModule } from './externalModule/ExternalModule';
	import type { InternalModule } from './internalModule/InternalModule';
	import InternalModuleDotsMenuButton from './internalModule/InternalModuleDotsMenuButton.svelte';

	const graphContext = getGraphContext();
	const projectDataContext = getProjectDataContext();

	function getHrefInternal(internalModule: InternalModule) {
		const { projectData } = projectDataContext;
		return `/projects/${projectData.id}/internalModules/${internalModule.id}/graph`;
	}

	function getHrefExternal(externalModule: ExternalModule) {
		const { projectData } = projectDataContext;
		return `/projects/${projectData.id}/externalModules/${externalModule.id}?closePath=${page.url}`;
	}
</script>

<ListPageLayout title="Modules">
	<div class="flex flex-col gap-4">
		<div>
			<h2>Internal modules</h2>
			<hr class="opacity-10" />
			<BasicList
				{getId}
				{getName}
				getHref={getHrefInternal}
				items={graphContext.graph.internalModules.values()}
			>
				{#snippet buttons({ item })}
					<InternalModuleDotsMenuButton internalModule={item} />
				{/snippet}
			</BasicList>
			{#if graphContext.graph.internalModules.values().length === 0}
				<div class="p-2 italic opacity-50">Nothing to show</div>
			{/if}
		</div>

		<div>
			<h2>External modules</h2>
			<hr class="opacity-10" />
			<BasicList
				{getId}
				{getName}
				getHref={getHrefExternal}
				items={graphContext.graph.externalModules.values()}
			></BasicList>
			{#if graphContext.graph.externalModules.values().length === 0}
				<div class="p-2 italic opacity-50">Nothing to show</div>
			{/if}
		</div>
	</div>
</ListPageLayout>
