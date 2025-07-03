<script lang="ts">
	import { editorContextKey } from '$lib/editor/editorContext';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { graphContextKey } from '$lib/graph/graphContext';
	import CreateInternalModuleButton from '$lib/module/internalModule/CreateInternalModuleButton.svelte';
	import type { Module } from '$lib/module/Module';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import InternalModuleDotsMenuButton from './InternalModuleDotsMenuButton.svelte';

	const graphContext = getRequiredContext(graphContextKey);
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

	function getHref(module: Module) {
		const { projectData } = projectDataContext;
		return `/projects/${projectData.id}/internalModules/${module.id}/graph`;
	}
</script>

<ListPageLayout title="Internal modules">
	{#snippet topChildren()}
		<CreateInternalModuleButton />
	{/snippet}
	<BasicList {getId} {getName} {getHref} items={graphContext.graph.internalModules.values()}>
		{#snippet buttons({ item })}
			<InternalModuleDotsMenuButton internalModule={item} />
		{/snippet}
	</BasicList>
</ListPageLayout>
