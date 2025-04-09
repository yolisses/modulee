<script lang="ts">
	import { RemoveInternalModuleCommand } from '$lib/commands/internalModule/RemoveInternalModuleCommand';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import type { Module } from '$lib/data/Module';
	import { getEditorContext } from '$lib/editor/editorContext';
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

<div class="flex-1 overflow-hidden">
	<div class="flex h-[100dvh] flex-col items-center overflow-auto">
		<div class="flex w-full max-w-xl flex-col gap-4 p-4">
			<div class="flex h-10 flex-row items-center justify-between gap-2">
				<h1 class="py-2 text-xl font-medium">Internal modules</h1>
				<div class="flex-1"></div>
				<CreateInternalModuleButton />
			</div>
			<BasicList {getId} {getName} {getHref} values={graphContext.graph.internalModules.values()}>
				{#snippet buttons(internalModule)}
					<button class="common-button" onclick={() => handleDelete(internalModule)}>Delete</button>
				{/snippet}
			</BasicList>
		</div>
	</div>
</div>
