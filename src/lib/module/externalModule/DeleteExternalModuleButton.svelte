<script lang="ts">
	import { RemoveExternalModuleReferenceCommand } from '$lib/commands/externalModule/RemoveExternalModuleReferenceCommand';
	import { createId } from '$lib/data/createId';
	import type { ExternalModule } from '$lib/data/ExternalModule';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		externalModule: ExternalModule;
	}

	const editorContext = getEditorContext();
	const { externalModule }: Props = $props();
	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const command = new RemoveExternalModuleReferenceCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'RemoveExternalModuleCommand',
			projectId: projectDataContext.projectData.id,
			details: { externalModuleReferenceId: externalModule.id },
		});
		editorContext.editor.execute(command);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faTrash} /> Delete
</button>
