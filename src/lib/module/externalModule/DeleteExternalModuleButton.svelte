<script lang="ts">
	import { goto } from '$app/navigation';
	import { createId } from '$lib/data/createId';
	import type { ExternalModule } from '$lib/data/ExternalModule';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	// TODO find a better way to decide the redirect
	interface Props {
		externalModule: ExternalModule;
		redirectsTo?: 'mainExternalModuleGraph';
	}

	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();
	const { externalModule, redirectsTo }: Props = $props();

	// TODO consider creating a commandFactoryContext to remove the need for
	// manually getting id, createdAt, type and projectId. It could work like:
	// const commandFactoryContext = getCommandContext();
	// const { commandFactory } = commandFactoryContext;
	// const command = commandFactory.create(SomeCommandClass, { someData:
	// 'someValue' })
	function handleClick() {
		const command = new RemoveExternalModuleCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'RemoveExternalModuleCommand',
			projectId: projectDataContext.projectData.id,
			details: { externalModuleId: externalModule.id },
		});
		editorContext.editor.execute(command);
		const {
			id: projectId,
			graph: { mainExternalModuleId },
		} = projectDataContext.projectData;

		if (redirectsTo === 'mainExternalModuleGraph') {
			goto(`/projects/${projectId}/externalModules/${mainExternalModuleId}/graph`);
		}
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faTrash} />
	Delete
</button>
