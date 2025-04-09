<script lang="ts">
	import { RemoveInternalModuleCommand } from '$lib/commands/internalModule/RemoveInternalModuleCommand';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import type { Module } from '$lib/data/Module';
	import { getEditorContext } from '$lib/editor/editorContext';
	import HomePageLayout from '$lib/home/HomePageLayout.svelte';
	import CreateInternalModuleButton from '$lib/module/internalModule/CreateInternalModuleButton.svelte';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	// TODO consider creating a commandFactoryContext to remove the need for manually getting id, createdAt, type and projectId. It could work like:
	// const commandFactoryContext = getCommandContext();
	// const { commandFactory } = commandFactoryContext;
	// const command = commandFactory.create(SomeCommandClass, { someData: 'someValue' })
	function handleDelete(internalModule: InternalModule) {
		const command = new RemoveInternalModuleCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'RemoveInternalModuleCommand',
			details: { internalModuleId: internalModule.id },
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(command);
	}

	function getHref(module: Module) {
		const { projectData } = projectDataContext;
		return `/projects/${projectData.id}/internalModules/${module.id}/nodes`;
	}
</script>

<HomePageLayout title="Internal modules">
	{#snippet topChildren()}
		<CreateInternalModuleButton />
	{/snippet}
	<BasicList {getId} {getName} {getHref} values={graphContext.graph.internalModules.values()}>
		{#snippet buttons(internalModule)}
			<button class="common-button" onclick={() => handleDelete(internalModule)}>Delete</button>
		{/snippet}
	</BasicList>
</HomePageLayout>
