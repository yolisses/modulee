<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { createId } from '$lib/utils/createId';
	import { getScreenFontSize } from '$lib/utils/getScreenFontSize';
	import { getScreenLineHeight } from '$lib/utils/getScreenLineHeight';
	import { AddNodeCommand } from './commands/AddNodeCommand';
	import { setContainerContext } from './containerContext';
	import type { ContainerWrapper } from './ContainerWrapper';
	import { createNodeData } from './createNodeData';
	import DevUnitDiv from './dev/DevUnitDiv.svelte';
	import { getPointerPosition } from './getPointerPosition';
	import { setPreviewConnectionContext } from './input/previewConnectionContext';
	import type { PreviewConnectionWrapper } from './input/PreviewConnectionWrapper';
	import NodeItem from './NodeItem.svelte';

	interface Props {
		editor: Editor;
		space: Space;
	}

	let { space, editor }: Props = $props();

	let containerWrapper = $state<ContainerWrapper>({});
	setContainerContext(containerWrapper);

	let previewConnectionWrapper = $state<PreviewConnectionWrapper>({
		previewConnection: {
			dataPointerPosition: new Vector(4, 8),
			input: editor.nodes[0].inputs[0],
			output: editor.nodes[1].outputs[0],
		},
	});
	setPreviewConnectionContext(previewConnectionWrapper);

	function handleClick(e: MouseEvent) {
		if (e.target !== containerWrapper.container) {
			return;
		}

		const rect = containerWrapper.container.getBoundingClientRect();
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

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
	}
</script>

<!-- This element should not have border -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- onclick={handleClick} -->
<div
	oncontextmenu={handleContextMenu}
	bind:this={containerWrapper.container}
	style:font-size={getScreenFontSize(space) + 'px'}
	style:line-height={getScreenLineHeight(space) + 'px'}
	class="dotted-grid relative min-h-screen w-full"
>
	<DevUnitDiv {space} />
	{#each editor.nodes as node (node.id)}
		<NodeItem {node} {space} {editor} />
	{/each}
	{#if previewConnectionWrapper.previewConnection}
		<!-- <PreviewWire {space} previewConnection={previewConnectionWrapper.previewConnection} /> -->
	{/if}
</div>

<style>
	.dotted-grid {
		background-size: 1em 1em;
		background-position: 0.5em 0.5em;
		background-image: radial-gradient(circle, #8888 0.05em, rgba(0, 0, 0, 0) 0.05em);
	}
</style>
