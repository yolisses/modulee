<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { setAddNodeInputContext } from '$lib/node/add/addNodeInputContext';
	import { getScreenFontSize } from '$lib/space/getScreenFontSize';
	import { getScreenLineHeight } from '$lib/space/getScreenLineHeight';
	import { spaceContextKey } from '$lib/space/spaceContext';
	import {
		EmptyPointerStrategy,
		PointerEventDispatcher,
		previewConnectionContextKey,
		PreviewConnectionPointerStrategy,
		rootElementContextKey,
		SelectionBoxPointerStrategy,
	} from 'nodes-editor';
	import { onMount, type Snippet } from 'svelte';
	import type { GraphSizer } from './GraphSizer.svelte';
	import { PreviewConnectionEndHandler } from './PreviewConnectionEndHandler';
	import { setIsOverscrollEnabled } from './setIsOverscrollEnabled';

	interface Props {
		children: Snippet;
		graphSizer: GraphSizer;
		oncontextmenu: (e: MouseEvent) => void;
		onscroll: (e: UIEvent) => void;
	}

	const { graphSizer, children, onscroll, oncontextmenu }: Props = $props();

	const addNodeInputContext = $state({});
	setAddNodeInputContext(addNodeInputContext);

	const size = $derived(graphSizer.getSize());

	let isTouchDevice = $state<boolean>();
	const previewConnectionContext = getRequiredContext(previewConnectionContextKey);
	const rootElementContext = getRequiredContext(rootElementContextKey);
	const spaceContext = getRequiredContext(spaceContextKey);

	const previewConnectionEndHandler = new PreviewConnectionEndHandler();
	onMount(() => {
		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	});

	function selectionBoxPointerCondition(e: PointerEvent) {
		// Ignore mouse right button, used for adding a node
		return e.button !== 2;
	}

	const selectionBoxPointerStrategy = $derived.by(() => {
		if (isTouchDevice === undefined) return;
		if (rootElementContext.rootElement === undefined) return;
		return new SelectionBoxPointerStrategy(
			rootElementContext.rootElement,
			isTouchDevice,
			selectionBoxPointerCondition,
		);
	});

	$effect(() => {
		const { rootElement } = rootElementContext;
		// Sveltekit doesn't support passing `passive` in a declarative way,
		// since it has super restrict use cases.
		rootElement?.addEventListener('touchend', handleTouchEnd, {
			passive: false,
		});
		rootElement?.addEventListener('touchstart', handleTouchStart, {
			passive: false,
		});
		rootElement?.addEventListener('touchmove', handleTouchMove, {
			passive: false,
		});

		return () => {
			rootElement?.removeEventListener('touchend', handleTouchEnd);
			rootElement?.removeEventListener('touchmove', handleTouchMove);
			rootElement?.removeEventListener('touchstart', handleTouchStart);
		};
	});

	const pointerStrategy = $derived.by(() => {
		const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(
			previewConnectionEndHandler.handleEndPreviewConnection,
		);

		const pointerStrategy = previewConnectionContext.startConnector
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy;

		return pointerStrategy ?? new EmptyPointerStrategy();
	});

	const handleTouchStart = (e: TouchEvent) => {
		setIsOverscrollEnabled(true);
		if (selectionBoxPointerStrategy?.isActive) {
			e.preventDefault();
		}
	};

	const handleTouchEnd = (e: TouchEvent) => {
		setIsOverscrollEnabled(false);
		if (selectionBoxPointerStrategy?.isActive) {
			e.preventDefault();
		}
	};

	// Maybe it's not required
	const handleTouchMove = (e: TouchEvent) => {
		if (selectionBoxPointerStrategy?.isActive) {
			e.preventDefault();
		}
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	{onscroll}
	class="flex-1 overflow-scroll"
	bind:this={graphSizer.scrollArea}
	style:font-size={getScreenFontSize(spaceContext.space) + 'px'}
	style:line-height={getScreenLineHeight(spaceContext.space) + 'px'}
>
	<PointerEventDispatcher {pointerStrategy}>
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
