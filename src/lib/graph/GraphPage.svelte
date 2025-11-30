<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
	import InternalModulesNavbar from '$lib/module/internalModule/InternalModulesNavbar.svelte';
	import { projectNavbarSelectionContextKey } from '$lib/project/projectNavbarSelectionContext';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { Space } from '$lib/space/Space.js';
	import { setSpaceContext } from '$lib/space/spaceContext';
	import { setZoomContext } from '$lib/space/zoom/zoomContext';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import { tick, untrack } from 'svelte';
	import GraphCanvas from './GraphCanvas.svelte';
	import { graphContextKey } from './graphContext';
	import { GraphSizer } from './GraphSizer.svelte';
	import GraphToolbar from './GraphToolbar.svelte';

	const projectNavbarSelectionContext = getRequiredContext(projectNavbarSelectionContextKey);
	projectNavbarSelectionContext.projectNavbarSelection = 'graph';

	const graphContext = getRequiredContext(graphContextKey);
	const internalModuleIdContext = getRequiredContext(internalModuleIdContextKey);

	const spaceContext = $state({ space: new Space() });
	setSpaceContext(spaceContext);

	const zoomContext = $state({ zoom: 20 });
	setZoomContext(zoomContext);

	const graphSizer = new GraphSizer();

	$effect(() => {
		spaceContext.space = new Space([
			new OffsetConverter(graphSizer.getOffset()),
			new ZoomConverter(zoomContext.zoom),
		]);
	});

	const internalModule = $derived(
		graphContext.graph.internalModules.values().find((internalModule) => {
			return internalModule.id === internalModuleIdContext.internalModuleId;
		}),
	);

	$inspect(internalModule);
	$inspect(internalModule?.nodes);

	// On internal module change:
	// 1. Clear positions (min and max)
	// 2. Update size with current nodes
	// 3. Auto scroll to show the nodes

	// If the graph changes but the internal module stays the same, just update
	// the size with current nodes

	$effect(() => {
		internalModuleIdContext.internalModuleId; // On internal module change
		untrack(() => {
			graphSizer.clearPositions();
		});
	});

	$effect(() => {
		if (internalModule) {
			graphSizer.handleNodesUpdate(internalModule.nodes);
		}
	});

	$effect(() => {
		internalModuleIdContext.internalModuleId; // On internal module change
		untrack(() => {
			// Wait for DOM updates
			tick().then(() => {
				if (internalModule) {
					graphSizer.autoScrollToNodesCenter(internalModule.nodes);
				}
			});
		});
	});
</script>

<div class="relative flex flex-1 flex-col overflow-hidden">
	<InternalModulesNavbar />
	<GraphToolbar />
	{#if internalModule}
		<!-- TODO consider creating a lazy connections getter in node, to pass
		only the needed connections -->
		<GraphCanvas
			{graphSizer}
			connections={graphContext.graph.connections.values()}
			nodes={internalModule.nodes}
		/>
	{/if}
</div>
