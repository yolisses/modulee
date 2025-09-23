<script lang="ts">
	import { OrganizeNodesCommand } from '$lib/commands/node/move/OrganizeNodesCommand';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
	import InternalModulesNavbar from '$lib/module/internalModule/InternalModulesNavbar.svelte';
	import { getProcessedGraphRegistry } from '$lib/process/getProcessedGraphRegistry';
	import { projectNavbarSelectionContextKey } from '$lib/project/projectNavbarSelectionContext';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { Space } from '$lib/space/Space.js';
	import { setSpaceContext } from '$lib/space/spaceContext';
	import { setZoomContext } from '$lib/space/zoom/zoomContext';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import { Graph } from '../Graph.svelte';
	import GraphCanvas from '../GraphCanvas.svelte';
	import { graphRegistryContextKey } from '../graphRegistryContext';
	import { GraphSizer } from '../GraphSizer.svelte';

	const projectNavbarSelectionContext = getRequiredContext(projectNavbarSelectionContextKey);
	projectNavbarSelectionContext.projectNavbarSelection = 'graph';

	const graphRegistryContext = getRequiredContext(graphRegistryContextKey);
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

	const processedGraphRegistry = $derived.by(() => {
		const organizeNodesCommand = new OrganizeNodesCommand({} as any);
		const graphRegistry = getProcessedGraphRegistry(graphRegistryContext.graphRegistry);
		organizeNodesCommand.execute(graphRegistry);
		return graphRegistry;
	});
	const graph = $derived(new Graph(processedGraphRegistry));
	const visibleNodes = $derived(
		graph.nodes.values().filter((node) => {
			return node.internalModuleId === internalModuleIdContext.internalModuleId;
		}),
	);
</script>

<svelte:head>
	<title>Graph Debug - Modulee</title>
</svelte:head>

<!-- TODO replace "Nodes" by "Graph" in this page and its components since it
sounds better on singular and contains things like connections too. -->
<div class="relative flex flex-1 flex-col overflow-hidden">
	<InternalModulesNavbar />
	<GraphCanvas {graphSizer} nodes={visibleNodes} connections={graph.connections.values()} />
</div>
