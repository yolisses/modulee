<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { devNodeTypes } from './devNodeTypes';
	import NodeTypeList from './NodeTypeList.svelte';

	interface Props {
		space: Space;
		editor: Editor;
		closeModal: () => void;
		screenPosition: Vector;
	}

	const { space, editor, closeModal, screenPosition: screenInitialPosition }: Props = $props();
	const screenOffset = new Vector(2, 56);
	const screenPosition = $derived(screenInitialPosition.subtract(screenOffset));
</script>

<div
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute rounded bg-zinc-600"
>
	<div class="p-2">Add Node</div>
	<hr class="opacity-50" />
	<NodeTypeList {space} {editor} nodeTypes={devNodeTypes} {closeModal} />
</div>
