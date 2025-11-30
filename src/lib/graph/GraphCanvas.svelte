<script lang="ts">
	import type { Connection } from '$lib/connection/Connection';
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { setAddNodeInputContext } from '$lib/node/add/addNodeInputContext';
	import AddNodeMenu from '$lib/node/add/AddNodeMenu.svelte';
	import {
		setAddNodeMenuParamsContext,
		type AddNodeMenuParamsContext,
	} from '$lib/node/add/addNodeMenuParamsContext';
	import FloatingMenuReference from '$lib/node/add/FloatingMenuReference.svelte';
	import type { Node } from '$lib/node/Node.svelte';
	import { setRenameNodesStateContext } from '$lib/node/RenameNodesStateContext';
	import NodeItem from '$lib/node/ui/NodeItem.svelte';
	import RenameNodesModal from '$lib/node/ui/RenameNodesModal.svelte';
	import SelectionBox from '$lib/selection/SelectionBox.svelte';
	import { spaceContextKey } from '$lib/space/spaceContext';
	import { getElementPosition, getEventClientPosition, rootElementContextKey } from 'nodes-editor';
	import GraphCanvasContainer from './GraphCanvasContainer.svelte';
	import type { GraphSizer } from './GraphSizer.svelte';
	import HowToAddNodesHint from './HowToAddNodesHint.svelte';

	interface Props {
		connections: Connection[];
		graphSizer: GraphSizer;
		nodes: Node[];
	}

	const { nodes, graphSizer, connections }: Props = $props();
	const addNodeInputContext = $state({});
	const renameNodesStateContext = $state({ nodes: [] });
	const addNodeMenuParamsContext = $state<AddNodeMenuParamsContext>({});
	const rootElementContext = getRequiredContext(rootElementContextKey);
	const spaceContext = getRequiredContext(spaceContextKey);
	let floatingMenuReference = $state<HTMLElement>();
	setAddNodeInputContext(addNodeInputContext);
	setAddNodeMenuParamsContext(addNodeMenuParamsContext);
	setRenameNodesStateContext(renameNodesStateContext);

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
</script>

<HowToAddNodesHint {nodes} />
<GraphCanvasContainer {graphSizer} oncontextmenu={handleContextMenu} onscroll={handleScroll}>
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
</GraphCanvasContainer>

<!-- The floating menu is outside the scrollable area to prevent the container
from scrolling when the menu is created -->
{#if floatingMenuReference && addNodeMenuParamsContext.addNodeMenuParams}
	<AddNodeMenu {floatingMenuReference} />
{/if}

{#if renameNodesStateContext.nodes.length > 0}
	<RenameNodesModal />
{/if}
