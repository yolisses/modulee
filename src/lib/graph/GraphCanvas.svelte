<script lang="ts">
	import type { Connection } from '$lib/connection/Connection';
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { getElementSize } from '$lib/graph/getElementSize';
	import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
	import { setAddNodeInputContext } from '$lib/node/add/addNodeInputContext';
	import AddNodeMenu from '$lib/node/add/AddNodeMenu.svelte';
	import {
		setAddNodeMenuParamsContext,
		type AddNodeMenuParamsContext,
	} from '$lib/node/add/addNodeMenuParamsContext';
	import FloatingMenuReference from '$lib/node/add/FloatingMenuReference.svelte';
	import type { Node } from '$lib/node/Node.svelte';
	import NodeItem from '$lib/node/ui/NodeItem.svelte';
	import SelectionBox from '$lib/selection/SelectionBox.svelte';
	import { getScreenFontSize } from '$lib/space/getScreenFontSize';
	import { getScreenLineHeight } from '$lib/space/getScreenLineHeight';
	import { spaceContextKey } from '$lib/space/spaceContext';
	import { zoomContextKey } from '$lib/space/zoom/zoomContext';
	import {
		getElementPosition,
		getEventClientPosition,
		PointerEventDispatcher,
		rootElementContextKey,
	} from 'nodes-editor';
	import { tick, untrack } from 'svelte';
	import { getNodesAveragePosition } from './getNodesAveragePosition';
	import { GraphCanvasPointerStrategyFactory } from './GraphCanvasPointerStrategyFactory.svelte';
	import type { GraphSizer } from './GraphSizer.svelte';
	import HowToAddNodesHint from './HowToAddNodesHint.svelte';

	interface Props {
		nodes: Node[];
		graphSizer: GraphSizer;
		connections: Connection[];
	}

	const { nodes, graphSizer, connections }: Props = $props();

	const spaceContext = getRequiredContext(spaceContextKey);
	const rootElementContext = getRequiredContext(rootElementContextKey);

	const addNodeMenuParamsContext = $state<AddNodeMenuParamsContext>({});
	setAddNodeMenuParamsContext(addNodeMenuParamsContext);

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
		scrollArea?.scrollTo({ top: scrollPosition.y, left: scrollPosition.x });
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

	const addNodeInputContext = $state({});
	setAddNodeInputContext(addNodeInputContext);

	function handleContextMenu(e: MouseEvent) {
		e.preventDefault();
		if (!rootElementContext.rootElement) return;
		const relativeScreenPosition = getEventClientPosition(e).subtract(
			getElementPosition(rootElementContext.rootElement),
		);
		const dataPosition = spaceContext.space.getDataPosition(relativeScreenPosition);
		addNodeMenuParamsContext.addNodeMenuParams = { position: dataPosition };
	}

	function handleScroll() {
		addNodeMenuParamsContext.addNodeMenuParams = undefined;
	}

	let floatingMenuReference = $state<HTMLElement>();
</script>

<HowToAddNodesHint {nodes} />
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={scrollArea}
	onscroll={handleScroll}
	class="flex-1 overflow-scroll"
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

			{#if addNodeMenuParamsContext.addNodeMenuParams}
				<FloatingMenuReference
					bind:floatingMenuReference
					dataPosition={addNodeMenuParamsContext.addNodeMenuParams.position}
				/>
			{/if}
		</div>
	</PointerEventDispatcher>
</div>

<!-- The floating menu is outside the scrollable area to prevent the container
from scrolling when the menu is created -->
{#if floatingMenuReference && addNodeMenuParamsContext.addNodeMenuParams}
	<AddNodeMenu {floatingMenuReference} />
{/if}

<style lang="postcss">
	.bg-dots {
		background-size: 1lh 1lh;
		background-position: 0.5lh 0.5lh;
		background-image: radial-gradient(circle, #8884 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
	}
</style>
