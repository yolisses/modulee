<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { createId } from '$lib/utils/createId';
	import { AddNodeCommand } from './commands/AddNodeCommand';
	import { defaultNodeSize } from './defaultNodeSize';
	import { getPointerPosition } from './getPointerPosition';
	import type { Node } from './Node';
	import NodeItem from './NodeItem.svelte';
	import NodeListBackground from './NodeListBackground.svelte';

	let { editor, space }: { editor: Editor; space: Space } = $props();
	let element: HTMLElement = $state();

	function handleClick(e: MouseEvent) {
		if (e.target !== element) {
			return;
		}

		const rect = element.getBoundingClientRect();
		const offsetVector = new Vector(rect.left, rect.top);
		const screenPosition = getPointerPosition(e).subtract(offsetVector);
		const dataPosition = space.getDataPosition(screenPosition);

		const node: Node = {
			id: createId(),
			size: defaultNodeSize,
			position: dataPosition.subtract(defaultNodeSize.divide(Vector.fromNumber(2))),
		};
		const addNodeCommand = new AddNodeCommand(node);
		editor.execute(addNodeCommand);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="min-w-screen relative min-h-screen border" bind:this={element} onclick={handleClick}>
	<NodeListBackground {space} />
	{#each editor.nodes as node (node.id)}
		<NodeItem {node} {space} {editor} />
	{/each}
</div>
