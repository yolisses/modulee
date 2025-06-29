<script lang="ts">
	import { RemoveEffectModuleNode } from '$lib/commands/externalModule/RemoveEffectModuleNode';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
	import { getProjectDataContext } from '$lib/project/ui/projectDataContextext';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();
	const editorContext = getEditorContext();
	const projectDataContext = getProjectDataContext();

	function handleClick() {
		const command = new RemoveEffectModuleNode({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'RemoveEffectModuleNode',
			details: { moduleNodeId: moduleNode.id },
			projectId: projectDataContext.projectData.id,
		});

		editorContext.editor.execute(command);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faTrash} />
	Remove effect
</button>
