<script lang="ts">
	import { RemoveExternalModuleReferenceCommand } from '$lib/commands/externalModule/RemoveExternalModuleReferenceCommand';
	import { RemoveInternalModuleCommand } from '$lib/commands/internalModule/RemoveInternalModuleCommand';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import { InternalModule } from '$lib/data/InternalModule.svelte';
	import type { Module } from '$lib/data/Module';
	import { getEditorContext } from '$lib/editor/editorContext';
	import ImportExternalModuleButton from '$lib/import/ImportExternalModuleButton.svelte';
	import CreateInternalModuleButton from '$lib/internalModule/CreateInternalModuleButton.svelte';
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
	function handleDelete(module: Module) {
		if (module instanceof InternalModule) {
			const command = new RemoveInternalModuleCommand({
				id: createId(),
				createdAt: new Date().toJSON(),
				type: 'RemoveInternalModuleCommand',
				details: { internalModuleId: module.id },
				projectId: projectDataContext.projectData.id,
			});
			editorContext.editor.execute(command);
		} else {
			const command = new RemoveExternalModuleReferenceCommand({
				id: createId(),
				createdAt: new Date().toJSON(),
				type: 'RemoveExternalModuleReferenceCommand',
				projectId: projectDataContext.projectData.id,
				details: { externalModuleReferenceId: module.id },
			});
			editorContext.editor.execute(command);
		}
	}

	function getHref(module: Module) {
		// TODO implement for external modules
		const { projectData } = projectDataContext;
		return `/projects/${projectData.id}/internalModules/${module.id}`;
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-row gap-2 p-2">
		<CreateInternalModuleButton class="primary-button" />
		<ImportExternalModuleButton />
	</div>
	<BasicList {getId} {getName} {getHref} values={graphContext.graph.modules.values()}>
		{#snippet buttons(internalModule)}
			<button class="common-button" onclick={() => handleDelete(internalModule)}>Delete</button>
		{/snippet}
	</BasicList>
</div>
