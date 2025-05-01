<script lang="ts">
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import type { Connection } from '$lib/data/Connection';
	import type { Node } from '$lib/data/Node.svelte';
	import AddNodeMenu from '$lib/node/add/AddNodeMenu.svelte';
	import { getScreenFontSize } from '$lib/node/getScreenFontSize';
	import { getScreenLineHeight } from '$lib/node/getScreenLineHeight';
	import NodeItem from '$lib/node/NodeItem.svelte';
	import SelectionBox from '$lib/selection/SelectionBox.svelte';
	import { getSpaceContext } from '$lib/space/spaceContext';
	import { getNodeRectsContext, getRootElementContext, PointerEventDispatcher } from 'nodes-editor';
	import { FloatingMenuManager } from './FloatingMenuManager.svelte';
	import { GraphCanvasPointerStrategyFactory } from './GraphCanvasPointerStrategyFactory.svelte';
	import { ResizeGraphCanvasHandler } from './ResizeGraphCanvasHandler.svelte';

	interface Props {
		nodes: Node[];
		connections: Connection[];
	}

	const { nodes, connections }: Props = $props();

	const spaceContext = getSpaceContext();
	const rootElementContext = getRootElementContext();

	/* Pointer events handling */
	const graphCanvasPointerStrategyFactory = new GraphCanvasPointerStrategyFactory();

	/* Resizing */
	let container: HTMLElement;
	const nodeRectsContext = getNodeRectsContext();
	const graphCanvasResizeHandler = new ResizeGraphCanvasHandler();
	$effect(() => {
		// Returns destructor
		return graphCanvasResizeHandler.initialize(container);
	});
	$effect(() => {
		graphCanvasResizeHandler.handleRectsChange(nodeRectsContext.nodeRects);
	});

	/* Add node menu position */
	const floatingMenuManager = new FloatingMenuManager();
	const menuPosition = $derived(floatingMenuManager.getMenuPosition());
	$effect(() => {
		// Forces update on menu position change
		floatingMenuManager.getMenuPosition();
		return floatingMenuManager.configureMenuPosition();
	});
</script>

{#if nodes.length === 0}
	<div class="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
		<div class="rounde text-white/50">Use right click to create nodes</div>
	</div>
{/if}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="flex-1 overflow-scroll"
	bind:this={container}
	style:overflow={floatingMenuManager.getIsActive() ? 'hidden' : 'scroll'}
>
	<PointerEventDispatcher pointerStrategy={graphCanvasPointerStrategyFactory.getPointerStrategy()}>
		<div
			class="bg-dots relative select-none"
			bind:this={rootElementContext.rootElement}
			oncontextmenu={floatingMenuManager.handleContextMenu}
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
			<SelectionBox />
			{#if menuPosition}
				<div
					class="absolute"
					style:top={menuPosition.y + 'px'}
					style:left={menuPosition.x + 'px'}
					bind:this={floatingMenuManager.positioner}
				></div>
			{/if}
		</div>
	</PointerEventDispatcher>
</div>

{#if menuPosition}
	<div bind:this={floatingMenuManager.menu} class="absolute">
		<AddNodeMenu closeModal={floatingMenuManager.closeModal} screenPosition={menuPosition} />
	</div>
{/if}

<svelte:window onpointerdown={floatingMenuManager.handleWindowClick} />

<style lang="postcss">
	.bg-dots {
		background-size: 1lh 1lh;
		background-position: 0.5lh 0.5lh;
		background-image: radial-gradient(circle, #8884 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
