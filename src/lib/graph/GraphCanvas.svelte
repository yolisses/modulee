<script lang="ts">
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import type { Connection } from '$lib/data/Connection';
	import type { Node } from '$lib/data/Node.svelte';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import AddNodeMenu from '$lib/node/add/AddNodeMenu.svelte';
	import { getScreenFontSize } from '$lib/node/getScreenFontSize';
	import { getScreenLineHeight } from '$lib/node/getScreenLineHeight';
	import NodeItem from '$lib/node/NodeItem.svelte';
	import SelectionBox from '$lib/selection/SelectionBox.svelte';
	import { getSpaceContext } from '$lib/space/spaceContext';
	import { getRootElementContext, PointerEventDispatcher } from 'nodes-editor';
	import { FloatingMenuManager } from './FloatingMenuManager.svelte';
	import FloatingMenuReference from './FloatingMenuReference.svelte';
	import FloatingMenuWrapper from './FloatingMenuWrapper.svelte';
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

	const spaceContext = getSpaceContext();
	const rootElementContext = getRootElementContext();

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
	const internalModuleIdContext = getInternalModuleIdContext();
	$effect(() => {
		internalModuleIdContext.internalModuleId; // Observes this variable
		if (nodes.length === 0) return;
		const averagePosition = getNodesAveragePosition(nodes);
		scrollArea?.scrollTo({
			top: averagePosition.y * getScreenLineHeight(spaceContext.space),
			left: averagePosition.x * getScreenLineHeight(spaceContext.space),
		});
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
			bind:this={rootElementContext.rootElement}
			oncontextmenu={floatingMenuManager.handleContextMenu}
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
