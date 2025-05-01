<script lang="ts">
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import type { Connection } from '$lib/data/Connection';
	import type { Node } from '$lib/data/Node.svelte';
	import SelectionBox from '$lib/selection/SelectionBox.svelte';
	import { getSpaceContext } from '$lib/space/spaceContext';
	import { getNodeRectsContext, getRootElementContext, PointerEventDispatcher } from 'nodes-editor';
	import { onMount } from 'svelte';
	import AddNodeMenuWrapper from './add/AddNodeMenuWrapper.svelte';
	import { getScreenFontSize } from './getScreenFontSize';
	import { getScreenLineHeight } from './getScreenLineHeight';
	import { GraphCanvasPointerStrategyFactory } from './GraphCanvasPointerStrategyFactory.svelte';
	import NodeItem from './NodeItem.svelte';
	import { ResizeGraphCanvasHandler } from './ResizeGraphCanvasHandler.svelte';

	interface Props {
		nodes: Node[];
		connections: Connection[];
	}

	const { nodes, connections }: Props = $props();
	let mouseEvent = $state<MouseEvent>();

	const spaceContext = getSpaceContext();
	const nodeRectsContext = getNodeRectsContext();
	const rootElementContext = getRootElementContext();

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		mouseEvent = e;
	}

	/* Pointer events handling */
	const graphCanvasPointerStrategyFactory = new GraphCanvasPointerStrategyFactory();

	/* Resizing */
	let container: HTMLElement;
	const graphCanvasResizeHandler = new ResizeGraphCanvasHandler();
	onMount(() => {
		// Returns destructor
		return graphCanvasResizeHandler.initialize(container);
	});
	$effect(() => {
		graphCanvasResizeHandler.handleRectsChange(nodeRectsContext.nodeRects);
	});
</script>

{#if nodes.length === 0}
	<div class="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
		<div class="rounde text-white/50">Use right click to create nodes</div>
	</div>
{/if}
<div class="flex-1 overflow-scroll" bind:this={container}>
	<PointerEventDispatcher
		oncontextmenu={handleContextMenu}
		pointerStrategy={graphCanvasPointerStrategyFactory.getPointerStrategy()}
	>
		<div
			class="bg-dots relative select-none"
			bind:this={rootElementContext.rootElement}
			style:width={graphCanvasResizeHandler.minSize.x + 'px'}
			style:height={graphCanvasResizeHandler.minSize.y + 'px'}
			style:font-size={getScreenFontSize(spaceContext.space) + 'px'}
			style:line-height={getScreenLineHeight(spaceContext.space) + 'px'}
		>
			{#each connections as connection (connection.id)}
				<ConnectionItem {connection} />
			{/each}

			{#each nodes as node (node.id)}
				<NodeItem {node} />
			{/each}

			<PreviewConnectionWire />
			<AddNodeMenuWrapper {mouseEvent} />
			<SelectionBox />
		</div>
	</PointerEventDispatcher>
</div>

<style lang="postcss">
	.bg-dots {
		background-size: 1lh 1lh;
		background-position: 0.5lh 0.5lh;
		background-image: radial-gradient(circle, #8884 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
