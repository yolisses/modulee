<script lang="ts">
	import { getGraphContext } from '$lib/data/graphContext';
	import type { Module } from '$lib/data/Module';
	import { getEditorContext } from '$lib/editor/editorContext';
	import CreateInternalModuleButton from '$lib/module/internalModule/CreateInternalModuleButton.svelte';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';
	import ListPageLayout from '$lib/ui/ListPageLayout.svelte';
	import InternalModuleDotsMenuButton from './InternalModuleDotsMenuButton.svelte';

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

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
