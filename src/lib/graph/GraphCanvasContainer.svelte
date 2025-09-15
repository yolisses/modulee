<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { setAddNodeInputContext } from '$lib/node/add/addNodeInputContext';
	import { getScreenFontSize } from '$lib/space/getScreenFontSize';
	import { getScreenLineHeight } from '$lib/space/getScreenLineHeight';
	import { spaceContextKey } from '$lib/space/spaceContext';
	import { PointerEventDispatcher, rootElementContextKey } from 'nodes-editor';
	import { type Snippet } from 'svelte';
	import { GraphCanvasPointerStrategyFactory } from './GraphCanvasPointerStrategyFactory.svelte';
	import type { GraphSizer } from './GraphSizer.svelte';

	interface Props {
		children: Snippet;
		graphSizer: GraphSizer;
		oncontextmenu: (e: MouseEvent) => void;
		onscroll: (e: UIEvent) => void;
	}

	const { graphSizer, children, onscroll, oncontextmenu }: Props = $props();
	const rootElementContext = getRequiredContext(rootElementContextKey);
	const spaceContext = getRequiredContext(spaceContextKey);

	/* Pointer events handling */
	const graphCanvasPointerStrategyFactory = new GraphCanvasPointerStrategyFactory();

	const addNodeInputContext = $state({});
	setAddNodeInputContext(addNodeInputContext);

	const size = $derived(graphSizer.getSize());
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	{onscroll}
	class="flex-1 overflow-scroll"
	bind:this={graphSizer.scrollArea}
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
