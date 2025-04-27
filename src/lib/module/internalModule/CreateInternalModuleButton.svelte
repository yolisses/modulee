<script lang="ts">
	import { AddInternalModuleCommand } from '$lib/commands/internalModule/AddInternalModuleCommand';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getNewItemName } from '../../ui/getNewItemName';

	interface Props {
		onInternalModuleCreated?: (internalModule: InternalModule) => void;
	}

	const { onInternalModuleCreated }: Props = $props();

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleCreateClick() {
		const internalModuleId = createId();
		const internalModuleName = getNewItemName(
			graphContext.graph.internalModules.values(),
			'Internal module',
		);
		const command = new AddInternalModuleCommand({
			id: createId(),
			type: 'AddInternalModuleCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: {
				internalModule: {
					id: internalModuleId,
					name: internalModuleName,
				},
			},
		});
		editorContext.editor.execute(command);

		if (onInternalModuleCreated) {
			const internalModule = graphContext.graph.internalModules.get(internalModuleId);
			onInternalModuleCreated(internalModule);
		}
	}
</script>

<button class="common-button" onclick={handleCreateClick}>
	<Fa fw icon={faPlus} />
	Create internal module
</button>
