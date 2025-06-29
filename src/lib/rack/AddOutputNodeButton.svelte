<script lang="ts">
	import { AddNodeCommand } from '$lib/commands/node/AddNodeCommand';
	import { getEditorContext } from '$lib/editor/editorContext';
	import { createId } from '$lib/global/createId';
	import type { InternalModule } from '$lib/module/internalModule/InternalModule.svelte';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { getProjectDataContext } from '$lib/project/ui/projectDataContext';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import { Vector } from 'nodes-editor';
	import Fa from 'svelte-fa';

	interface Props {
		internalModule: InternalModule;
	}

	const editorContext = getEditorContext();
	const { internalModule }: Props = $props();
	const projectDataContext = getProjectDataContext();
	const internalModuleIdContext = getInternalModuleIdContext();

	function handleClick() {
		const position =
			internalModule.nodes.reduce(
				(previous, current) => {
					if (!previous) return current.position;
					return previous.max(current.position);
				},
				null as Vector | null,
			) ?? Vector.zero();

		const command = new AddNodeCommand({
			id: createId(),
			createdAt: new Date().toJSON(),
			projectId: projectDataContext.projectData.id,
			type: 'AddNodeCommand',
			details: {
				node: {
					extras: {},
					id: createId(),
					type: 'OutputNode',
					position: position.getData(),
					unconnectedInputValues: { input: 0 },
					internalModuleId: internalModuleIdContext.internalModuleId,
				},
			},
		});
		editorContext.editor.execute(command);
	}
</script>

<button class="common-button" onclick={handleClick}>
	<Fa icon={faPlus} />
	Add output node
</button>
