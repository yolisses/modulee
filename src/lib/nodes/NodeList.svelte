<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import type { Node } from '$lib/types/Node';
	import { createId } from '$lib/utils/createId';
	import { AddNodeCommand } from './commands/AddNodeCommand';
	import NodeItem from './NodeItem.svelte';

	let { editor }: { editor: Editor } = $props();
	let element: HTMLElement = $state();

	const space = new Space([new OffsetConverter(new Vector(2, 1)), new ZoomConverter(100)]);

	function handleClick(e: MouseEvent) {
		if (e.target !== element) {
			return;
		}

		const rect = element.getBoundingClientRect();
		const screenPosition = new Vector(e.clientX - rect.left, e.clientY - rect.top);
		const dataPosition = space.getDataPosition(screenPosition);

		const node: Node = {
			id: createId(),
			size: Vector.one(),
			position: dataPosition
		};
		const addNodeCommand = new AddNodeCommand(node);
		editor.execute(addNodeCommand);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="min-w-screen relative min-h-screen border" bind:this={element} onclick={handleClick}>
	{#each editor.nodes as node (node.id)}
		<NodeItem {node} {space} {editor} />
	{/each}
</div>
