<script lang="ts">
	import { goto } from '$app/navigation';
	import { RemoveInternalModuleCommand } from '$lib/commands/internalModule/RemoveInternalModuleCommand';
	import { editorContextKey } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { projectDataContextKey } from '$lib/project/ui/projectDataContext';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { InternalModule } from './InternalModule';

	// TODO find a better way to decide the redirect
	interface Props {
		internalModule: InternalModule;
		redirectsTo?: 'mainInternalModuleGraph';
	}

	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);
	const { internalModule, redirectsTo }: Props = $props();

	// TODO consider creating a commandFactoryContext to remove the need for
	// manually getting id, createdAt, type and projectId. It could work like:
	// const commandFactoryContext = getRequiredContext(commandContextKey);
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
		const {
			id: projectId,
			graph: { mainInternalModuleId },
		} = projectDataContext.projectData;

		if (redirectsTo === 'mainInternalModuleGraph') {
			goto(`/projects/${projectId}/internalModules/${mainInternalModuleId}/graph`);
		}
	}
</script>

{#if internalModule.id !== projectDataContext.projectData.graph.mainInternalModuleId}
	<button class="common-button" onclick={handleClick}>
		<Fa fw icon={faTrash} />
		Delete
	</button>
{/if}
