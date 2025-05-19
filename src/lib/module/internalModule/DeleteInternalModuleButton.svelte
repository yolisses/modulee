<script lang="ts">
	import { RemoveInternalModuleCommand } from '$lib/commands/internalModule/RemoveInternalModuleCommand';
	import { createId } from '$lib/data/createId';
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		internalModule: InternalModule;
	}

	const editorContext = getEditorContext();
	const { internalModule }: Props = $props();
	const projectDataContext = getProjectDataContext();

	// TODO consider creating a commandFactoryContext to remove the need for
	// manually getting id, createdAt, type and projectId. It could work like:
	// const commandFactoryContext = getCommandContext();
	// const { commandFactory } = commandFactoryContext;
	// const command = commandFactory.create(SomeCommandClass, { someData:
	// 'someValue' })
	function handleClick() {
		const command = new RemoveInternalModuleCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'RemoveInternalModuleCommand',
			projectId: projectDataContext.projectData.id,
			details: { internalModuleId: internalModule.id },
		});
		editorContext.editor.execute(command);
	}
</script>

{#if internalModule.id !== projectDataContext.projectData.graph.mainInternalModuleId}
	<button class="common-button" onclick={handleClick}>
		<Fa fw icon={faTrash} />
		Delete
	</button>
{/if}
