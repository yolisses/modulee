<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { createId } from '$lib/utils/createId';
	import { getScreenFontSize } from '$lib/utils/getScreenFontSize';
	import { getScreenLineHeight } from '$lib/utils/getScreenLineHeight';
	import { AddNodeCommand } from './commands/AddNodeCommand';
	import ConnectionList from './connector/ConnectionList.svelte';
	import { createNodeData } from './createNodeData';
	import { getPointerPosition } from './getPointerPosition';
	import NodeItem from './NodeItem.svelte';

	let element: Element;
	let {
		space,
		editor,
		dataMinimumPosition,
	}: { editor: Editor; space: Space; dataMinimumPosition: Vector } = $props();

	function handleClick(e: MouseEvent) {
		if (e.target !== element) {
			return;
		}

		const rect = element.getBoundingClientRect();
		const offsetVector = new Vector(rect.left, rect.top);
		const screenPosition = getPointerPosition(e).subtract(offsetVector);
		const dataPosition = space.getDataPosition(screenPosition);

		const addNodeCommand = new AddNodeCommand({
			id: createId(),
			type: 'AddNodeCommand',
			details: { node: createNodeData(dataPosition) },
		});
		editor.execute(addNodeCommand);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="dotted-grid relative min-h-screen w-full border-4"
	bind:this={element}
	onclick={handleClick}
	style:font-size={getScreenFontSize(space) + 'px'}
	style:line-height={getScreenLineHeight(space) + 'px'}
>
	{#each editor.nodes as node (node.id)}
		<NodeItem {node} {space} {editor} />
	{/each}
	<ConnectionList nodes={editor.nodes} {space} {dataMinimumPosition} />
</div>

<style>
	.dotted-grid {
		background-size: 1em 1em;
		background-position: 0.5em 0.5em;
		background-image: radial-gradient(circle, #8888 0.125em, rgba(0, 0, 0, 0) 0.125em);
	}
</style>
