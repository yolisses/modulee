<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import { createId } from '$lib/utils/createId';
	import { getDataPointerPosition } from '$lib/utils/getDataPointerPosition';
	import { AddNodeCommand } from './commands/AddNodeCommand';
	import { getContainerContext } from './containerContext';
	import type { NodeType } from './NodeType';

	interface Props {
		space: Space;
		editor: Editor;
		nodeType: NodeType;
		closeModal: () => void;
	}

	const { space, editor, nodeType, closeModal }: Props = $props();

	const containerWrapper = getContainerContext();

	function handleClick(e: MouseEvent) {
		if (!containerWrapper.container) return;
		closeModal();

		const dataPosition = getDataPointerPosition(e, space, containerWrapper.container);

		const command = new AddNodeCommand({
			id: createId(),
			type: 'AddNodeCommand',
			details: {
				node: {
					id: createId(),
					position: dataPosition,
					inputs: nodeType.inputNames.map((inputName) => {
						return { id: createId(), name: inputName };
					}),
					outputs: nodeType.outputNames.map((outputName) => {
						return { id: createId(), name: outputName };
					}),
				},
			},
		});
		editor.execute(command);
	}
</script>

<button onclick={handleClick} class="common-button">
	{nodeType.name}
</button>
