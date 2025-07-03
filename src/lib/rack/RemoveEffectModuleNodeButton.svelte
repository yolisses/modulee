<script lang="ts">
	import { RemoveEffectModuleNode } from '$lib/commands/externalModule/RemoveEffectModuleNode';
	import { createId } from '$lib/global/createId';
	import type { ModuleNode } from '$lib/node/ModuleNode.svelte';
	import { faTrash } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';

	interface Props {
		moduleNode: ModuleNode;
	}

	const { moduleNode }: Props = $props();
	const editorContext = getRequiredContext(editorContextKey);
	const projectDataContext = getRequiredContext(projectDataContextKey);

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
