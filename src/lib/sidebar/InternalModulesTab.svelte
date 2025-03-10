<script lang="ts">
	import { RemoveInternalModuleCommand } from '$lib/commands/internalModule/RemoveInternalModuleCommand';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import ImportModuleButton from '$lib/import/ImportModuleButton.svelte';
	import CreateInternalModuleButton from '$lib/internalModule/CreateInternalModuleButton.svelte';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import BasicList from '$lib/ui/BasicList.svelte';
	import { getId } from '$lib/ui/getId';
	import { getName } from '$lib/ui/getName';

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleDelete(internalModule: InternalModule) {
		const command = new RemoveInternalModuleCommand({
			id: createId(),
			type: 'RemoveInternalModuleCommand',
			createdAt: new Date().toJSON(),
			details: { internalModuleId: internalModule.id },
			projectId: projectDataContext.projectData.id,
		});
		editorContext.editor.execute(command);
	}

	function getHref(internalModule: InternalModule) {
		const { projectData } = projectDataContext;
		return `/projects/${projectData.id}/internalModules/${internalModule.id}`;
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-row gap-2 p-2">
		<CreateInternalModuleButton class="primary-button" />
		<ImportModuleButton />
	</div>
	<BasicList {getId} {getName} {getHref} values={graphContext.graph.internalModules.values()}>
		{#snippet buttons(internalModule)}
			<button class="common-button" onclick={() => handleDelete(internalModule)}>Delete</button>
		{/snippet}
	</BasicList>
</div>
