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
	import { onMount } from 'svelte';
	import { FloatingMenuManager } from './FloatingMenuManager.svelte';
	import FloatingMenuReference from './FloatingMenuReference.svelte';
	import FloatingMenuWrapper from './FloatingMenuWrapper.svelte';
	import { GraphCanvasPointerStrategyFactory } from './GraphCanvasPointerStrategyFactory.svelte';
	import HowToAddNodesHint from './HowToAddNodesHint.svelte';
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
	onMount(() => {
		// Returns destructor
		return graphCanvasResizeHandler.initialize(container);
	});
	$effect(() => {
		graphCanvasResizeHandler.handleRectsChange(nodeRectsContext.nodeRects);
	});

	/* Add node menu position */
	const floatingMenuManager = new FloatingMenuManager();
	$effect(() => {
		// Forces update on menu position change
		floatingMenuManager.getMenuPosition();
		return floatingMenuManager.configureMenuPosition();
	});
</script>

<HowToAddNodesHint {nodes} />
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="flex-1"
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
			<FloatingMenuReference {floatingMenuManager} />
		</div>
	</PointerEventDispatcher>
</div>

<!-- The floating menu is outside the scrollable area to prevent the container
from scrolling when the menu is created -->
<FloatingMenuWrapper {floatingMenuManager}>
	{#snippet children({ menuPosition })}
		<AddNodeMenu closeModal={floatingMenuManager.closeModal} screenPosition={menuPosition} />
	{/snippet}
</FloatingMenuWrapper>

<style lang="postcss">
	.bg-dots {
		background-size: 1lh 1lh;
		background-position: 0.5lh 0.5lh;
		background-image: radial-gradient(circle, #8884 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
