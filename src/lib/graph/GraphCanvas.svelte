<script lang="ts">
	import type { Connection } from '$lib/connection/Connection';
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { getElementSize } from '$lib/graph/getElementSize';
	import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
	import { setAddNodeInputContext } from '$lib/node/add/addNodeInputContext';
	import AddNodeMenu from '$lib/node/add/AddNodeMenu.svelte';
	import { FloatingMenuManager } from '$lib/node/add/FloatingMenuManager.svelte';
	import type { Node } from '$lib/node/Node.svelte';
	import NodeItem from '$lib/node/ui/NodeItem.svelte';
	import SelectionBox from '$lib/selection/SelectionBox.svelte';
	import { getScreenFontSize } from '$lib/space/getScreenFontSize';
	import { getScreenLineHeight } from '$lib/space/getScreenLineHeight';
	import { spaceContextKey } from '$lib/space/spaceContext';
	import { zoomContextKey } from '$lib/space/zoom/zoomContext';
	import {
		getEventClientPosition,
		PointerEventDispatcher,
		rootElementContextKey,
	} from 'nodes-editor';
	import { tick, untrack } from 'svelte';
	import { getNodesAveragePosition } from './getNodesAveragePosition';
	import { GraphCanvasPointerStrategyFactory } from './GraphCanvasPointerStrategyFactory.svelte';
	import type { GraphSizer } from './GraphSizer.svelte';
	import HowToAddNodesHint from './HowToAddNodesHint.svelte';
	import FloatingMenuReference from '$lib/node/add/FloatingMenuReference.svelte';
	import FloatingMenuWrapper from '$lib/node/add/FloatingMenuWrapper.svelte';

	interface Props {
		nodes: Node[];
		graphSizer: GraphSizer;
		connections: Connection[];
	}

	const { nodes, graphSizer, connections }: Props = $props();

	const spaceContext = getRequiredContext(spaceContextKey);
	const rootElementContext = getRequiredContext(rootElementContextKey);

	/* Pointer events handling */
	const graphCanvasPointerStrategyFactory = new GraphCanvasPointerStrategyFactory();

	/* Resizing */
	let scrollArea = $state<HTMLElement>();
	$effect(() => {
		graphSizer.scrollArea = scrollArea;
	});
	$effect(() => {
		graphSizer.handleNodesUpdate(nodes);
	});
	const size = $derived(graphSizer.getSize());

	/* Centering on navigation */
	const internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);

	const zoomContext = getRequiredContext(zoomContextKey);

	function autoScroll() {
		if (!scrollArea) return;
		if (nodes.length === 0) return;

		const { minPosition } = graphSizer;
		if (!minPosition) return;

		const scrollAreaSize = getElementSize(scrollArea);
		const averagePosition = getNodesAveragePosition(nodes);
		const scrollPosition = averagePosition
			.subtract(minPosition)
			.multiplyByNumber(zoomContext.zoom)
			.subtract(scrollAreaSize.divideByNumber(2));
		scrollArea?.scrollTo({
			top: scrollPosition.y,
			left: scrollPosition.x,
		});
	}

	$effect(() => {
		// Only runs when internalModuleId changes
		internalModuleIdContext.internalModuleId;
		untrack(() => {
			// Wait for DOM updates
			tick().then(() => {
				autoScroll();
			});
		});
	});

	/* Add node menu position */
	const floatingMenuManager = new FloatingMenuManager();
	$effect(() => {
		// Forces update on menu position change
		floatingMenuManager.getMenuPosition();
		return floatingMenuManager.configureMenuPosition();
	});

	const addNodeInputContext = $state({});
	setAddNodeInputContext(addNodeInputContext);

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		floatingMenuManager.menuClientPosition = getEventClientPosition(e);
	}
</script>

<HowToAddNodesHint {nodes} />
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={scrollArea}
	class="flex-1 overflow-scroll"
	onscroll={floatingMenuManager.closeModal}
	style:font-size={getScreenFontSize(spaceContext.space) + 'px'}
	style:line-height={getScreenLineHeight(spaceContext.space) + 'px'}
>
	<PointerEventDispatcher pointerStrategy={graphCanvasPointerStrategyFactory.getPointerStrategy()}>
		<div
			style:width={size.x + 'lh'}
			style:height={size.y + 'lh'}
			oncontextmenu={handleContextMenu}
			bind:this={rootElementContext.rootElement}
			class="bg-dots relative shrink-0 grow-0 overflow-hidden select-none"
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
	<AddNodeMenu />
</FloatingMenuWrapper>

<style lang="postcss">
	.bg-dots {
		background-size: 1lh 1lh;
		background-position: 0.5lh 0.5lh;
		background-image: radial-gradient(circle, #8884 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
