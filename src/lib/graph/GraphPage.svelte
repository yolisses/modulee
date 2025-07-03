<script lang="ts">
	import { getGraphContext } from '$lib/graph/graphContext';
	import { getInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import InternalModulesNavbar from '$lib/module/internalModule/InternalModulesNavbar.svelte';
	import { getProjectNavbarSelectionContext } from '$lib/project/projectNavbarSelectionContext';
	import { Contexts } from '$lib/shortcut/Contexts.svelte';
	import { setContextsContext } from '$lib/shortcut/contextsContext';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { Space } from '$lib/space/Space.js';
	import { setSpaceContext } from '$lib/space/spaceContext';
	import { setZoomContext } from '$lib/space/zoom/zoomContext';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import GraphCanvas from './GraphCanvas.svelte';
	import { GraphSizer } from './GraphSizer.svelte';
	import GraphToolbar from './GraphToolbar.svelte';

	const projectNavbarSelectionContext = getProjectNavbarSelectionContext();
	projectNavbarSelectionContext.projectNavbarSelection = 'graph';

	const graphContext = getGraphContext();
	const internalModuleIdContext = getInternalModuleIdContext();

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

	const visibleNodes = $derived(
		graphContext.graph.nodes.values().filter((node) => {
			return node.internalModuleId === internalModuleIdContext.internalModuleId;
		}),
	);

	const contexts = new Contexts();
	setContextsContext({ contexts });
</script>

<svelte:head>
	<title>Graph - Modulee</title>
</svelte:head>

<!-- TODO replace "Nodes" by "Graph" in this page and its components since it
sounds better on singular and contains things like connections too. -->
<div class="relative flex flex-1 flex-col overflow-hidden">
	<InternalModulesNavbar />
	<GraphToolbar />
	<GraphCanvas
		{graphSizer}
		nodes={visibleNodes}
		connections={graphContext.graph.connections.values()}
	/>
</div>
