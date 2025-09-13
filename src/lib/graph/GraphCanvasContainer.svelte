<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { getElementSize } from '$lib/graph/getElementSize';
	import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
	import { setAddNodeInputContext } from '$lib/node/add/addNodeInputContext';
	import type { Node } from '$lib/node/Node.svelte';
	import { getScreenFontSize } from '$lib/space/getScreenFontSize';
	import { getScreenLineHeight } from '$lib/space/getScreenLineHeight';
	import { spaceContextKey } from '$lib/space/spaceContext';
	import { zoomContextKey } from '$lib/space/zoom/zoomContext';
	import { PointerEventDispatcher, rootElementContextKey } from 'nodes-editor';
	import { tick, untrack, type Snippet } from 'svelte';
	import { getNodesAveragePosition } from './getNodesAveragePosition';
	import { GraphCanvasPointerStrategyFactory } from './GraphCanvasPointerStrategyFactory.svelte';
	import type { GraphSizer } from './GraphSizer.svelte';

	interface Props {
		children: Snippet;
		graphSizer: GraphSizer;
		nodes: Node[];
		oncontextmenu: (e: MouseEvent) => void;
		onscroll: (e: UIEvent) => void;
	}

	const { nodes, graphSizer, children, onscroll, oncontextmenu }: Props = $props();
	const rootElementContext = getRequiredContext(rootElementContextKey);
	const spaceContext = getRequiredContext(spaceContextKey);

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
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	{onscroll}
	bind:this={scrollArea}
	class="flex-1 overflow-scroll"
	style:font-size={getScreenFontSize(spaceContext.space) + 'px'}
	style:line-height={getScreenLineHeight(spaceContext.space) + 'px'}
>
	<PointerEventDispatcher pointerStrategy={graphCanvasPointerStrategyFactory.getPointerStrategy()}>
		<div
			{oncontextmenu}
			bind:this={rootElementContext.rootElement}
			class="bg-dots relative shrink-0 grow-0 touch-pan-x touch-pan-y overflow-hidden select-none"
			style:height={size.y + 'lh'}
			style:width={size.x + 'lh'}
		>
			{@render children()}
		</div>
	</PointerEventDispatcher>
</div>

<style lang="postcss">
	.bg-dots {
		background-image: radial-gradient(circle, #8884 0.05lh, rgba(0, 0, 0, 0) 0.05lh);
		background-position: 0.5lh 0.5lh;
		background-size: 1lh 1lh;
	}
</style>
