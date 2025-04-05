<script lang="ts">
	import { AddInternalModuleCommand } from '$lib/commands/internalModule/AddInternalModuleCommand';
	import { createId } from '$lib/data/createId';
	import { getGraphContext } from '$lib/data/graphContext';
	import type { InternalModule } from '$lib/data/InternalModule.svelte';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { getProjectDataContext } from '$lib/project/projectDataContext';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		class?: string;
		onInternalModuleCreated?: (internalModule: InternalModule) => void;
	}

	const { onInternalModuleCreated, class: classString }: Props = $props();

	const graphContext = getGraphContext();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleCreateClick() {
		const internalModuleId = createId();
		const command = new AddInternalModuleCommand({
			id: createId(),
			type: 'AddInternalModuleCommand',
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			details: {
				internalModule: {
					id: internalModuleId,
					name: 'New internal module',
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

<button class={classString} onclick={handleCreateClick}>
	<Fa icon={faPlus} />
	Create internal module
</button>
