<script lang="ts">
	import { SetInputConnectedOutput } from '$lib/commands/SetInputConnectedOutput.js';
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import { createId } from '$lib/data/createId.js';
	import { getEditorContext } from '$lib/editor/editorContext.js';
	import { getProjectDataContext } from '$lib/project/projectDataContext.js';
	import SelectionBox from '$lib/selection/SelectionBox.svelte';
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import {
		getNodeListContext,
		getNodeRectsContext,
		getPreviewConnectionContext,
		getRectsBoundingRect,
		PointerEventDispatcher,
		PreviewConnectionPointerStrategy,
		SelectionBoxPointerStrategy,
		Vector,
		type EndPreviewConnectionEvent,
	} from 'nodes-editor';
	import type { Node } from '../data/Node.svelte.js';
	import AddNodeMenuWrapper from './add/AddNodeMenuWrapper.svelte';
	import ConstantNodeItem from './ConstantNodeItem.svelte';
	import { getInputAndOutput } from './getInputAndOutput.js';
	import { getScreenFontSize } from './getScreenFontSize.js';
	import { getScreenLineHeight } from './getScreenLineHeight.js';
	import NodeItem from './NodeItem.svelte';

	interface Props {
		nodes: Node[];
	}

	const { nodes }: Props = $props();
	let mouseEvent = $state<MouseEvent>();
	const spaceContext = getSpaceContext();
	const editorContext = getEditorContext();
	const nodeListContext = getNodeListContext();
	const nodeRectsContext = getNodeRectsContext();
	const projectDataContext = getProjectDataContext();

	function handleEndPreviewConnection(e: EndPreviewConnectionEvent) {
		const { input, output } = getInputAndOutput(e);
		if (!input) return;
		const command = new SetInputConnectedOutput({
			id: createId(),
			createdAt: new Date().toJSON(),
			type: 'SetInputConnectedOutput',
			projectId: projectDataContext.projectData.id,
			details: {
				inputPath: {
					nodeId: input.node.id,
					inputName: input.name,
				},
				outputId: output?.id,
			},
		});
		editorContext.editor.execute(command);
	}

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		mouseEvent = e;
	}

	const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(
		handleEndPreviewConnection,
	);
	const selectionBoxPointerStrategy = new SelectionBoxPointerStrategy();

	const previewConnectionContext = getPreviewConnectionContext();
	const pointerStrategy = $derived(
		previewConnectionContext.startConnector
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy,
	);

	let minSize = $state(Vector.zero());

	$effect(() => {
		const nodeRects = Object.values(nodeRectsContext.nodeRects);
		if (nodeRects.length === 0) return;

		const step = 200;
		const boundingRect = getRectsBoundingRect(nodeRects);

		const currentMinSize = boundingRect.size
			.add(boundingRect.position)
			.divideByNumber(step)
			.ceil()
			.multiplyByNumber(step);

		if (minSize.x < currentMinSize.x || minSize.y < currentMinSize.y) {
			minSize = currentMinSize;
		}
	});
</script>

<PointerEventDispatcher
	oncontextmenu={handleContextMenu}
	{pointerStrategy}
	class="flex flex-1 flex-col"
>
	<div
		style:min-width={minSize.x + 'px'}
		style:min-height={minSize.y + 'px'}
		bind:this={nodeListContext.nodeList}
		class="bg-dots relative flex-1 select-none"
		style:font-size={getScreenFontSize(spaceContext.space) + 'px'}
		style:line-height={getScreenLineHeight(spaceContext.space) + 'px'}
	>
		{#each nodes as node (node.id)}
			{#if node.type === 'ConstantNode'}
				<ConstantNodeItem {node} />
			{:else}
				<NodeItem {node} />
			{/if}
		{/each}

		<!-- This is here instead of in InputItem because BaseNodeItem there's
		the node position offset -->
		{#each nodes as node (node.id)}
			{#each node.inputs as input (input.name)}
				<ConnectionItem {input} />
			{/each}
		{/each}

		<PreviewConnectionWire />
		<AddNodeMenuWrapper {mouseEvent} />
		<SelectionBox />
	</div>
</PointerEventDispatcher>

<style lang="postcss">
	.bg-dots {
		background-size: 1lh 1lh;
		background-position: 0.5lh 0.5lh;
		background-image: radial-gradient(circle, #8888 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
