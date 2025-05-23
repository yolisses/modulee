<script lang="ts">
	import { AddExternalModuleReferenceCommand } from '$lib/commands/externalModule/AddExternalModuleReferenceCommand';
	import { createId } from '$lib/data/createId';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faDownload } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import type { ExternalModuleData } from './ExternalModuleData';

	interface Props {
		externalModuleData: ExternalModuleData;
	}

	const editorContext = getEditorContext();
	const { externalModuleData }: Props = $props();
	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const command = new AddExternalModuleReferenceCommand({
			createdAt: new Date().toJSON(),
			id: createId(),
			type: 'AddExternalModuleReferenceCommand',
			projectId: projectDataContext.projectData.id,
			details: {
				externalModuleReference: {
					type: 'external',
					id: externalModuleData.id,
					version: externalModuleData.version,
				},
			},
		});
		editorContext.editor.execute(command);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa fw icon={faDownload} />
	Use
</button>
