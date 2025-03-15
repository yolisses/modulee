<script lang="ts">
	import ActionCommandsPalette from '$lib/CommandPalette/ActionCommandsPalette.svelte';
	import { getIsCommandPaletteActiveContext } from '$lib/CommandPalette/isCommandPaletteActiveContext';
	import { Graph } from '$lib/data/Graph.svelte';
	import { setGraphContext } from '$lib/data/graphContext';
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
	import { getGraphEngineData } from '$lib/engine/data/getGraphEngineData';
	import { setGraphRegistryContext } from '$lib/graph/graphRegistryContext';
	import { setInternalModuleIdContext } from '$lib/internalModule/internalModuleIdContext';
	import { getExternalModulesDataContext } from '$lib/module/externalModulesDataContext';
	import NodesPage from '$lib/node/NodesPage.svelte';
	import { getProcessedGraphRegistry } from '$lib/process/getProcessedGraphRegistry';
	import { getGraphData } from '$lib/sidebar/getGraphData';
	import { getIsSidebarVisibleContext } from '$lib/sidebar/isSidebarVisibleContext';
	import { setSelectedTabContext } from '$lib/sidebar/selectedTabContext';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';
	import { setDefaultContexts } from 'nodes-editor';
	import { type Snippet } from 'svelte';
	import { getGraphRegistry } from './getGraphRegistry';
	import { getProjectsRepository } from './getProjectsRepository';
	import { getProjectDataContext } from './projectDataContext';
	import { setMenuVisibilityContexts } from './setMenuVisibilityContexts.svelte';

	interface Props {
		children: Snippet;
	}

	setDefaultContexts();

	const { children }: Props = $props();

	const selectedTabContext = $state({ selectedTab: 'project' });
	setSelectedTabContext(selectedTabContext);

	const projectDataContext = getProjectDataContext();

	const internalModuleContext = $state({
		internalModuleId: projectDataContext.projectData.graphData.mainInternalModuleId,
	});
	setInternalModuleIdContext(internalModuleContext);

	const graphRegistryContext = $state({
		graphRegistry: getGraphRegistry(projectDataContext.projectData.graphData),
	});
	setGraphRegistryContext(graphRegistryContext);

	const externalModulesDataContext = getExternalModulesDataContext();

	const graph = new Graph(
		graphRegistryContext.graphRegistry,
		externalModulesDataContext.externalModulesData,
	);
	const graphContext = $state({ graph });
	setGraphContext(graphContext);

	const editor = new Editor(graphRegistryContext.graphRegistry);

	editor.onExecute = (command, graphRegistry) => {
		graphRegistryContext.graphRegistry = graphRegistry;
		graphContext.graph = new Graph(
			graphRegistryContext.graphRegistry,
			externalModulesDataContext.externalModulesData,
		);

		const graphData = getGraphData(graphRegistry);

		projectDataContext.projectData.graphData = graphData;

		const projectsRepository = getProjectsRepository();
		projectsRepository.updateProjectGraphData(projectDataContext.projectData.id, graphData);
	};

	const editorContext = $state({ editor });
	setEditorContext(editorContext);

	const audioBackendContext = getAudioBackendContext();
	$effect(() => {
		const { graphRegistry } = graphRegistryContext;
		const { externalModulesData } = externalModulesDataContext;
		const processedGraphRegistry = getProcessedGraphRegistry(graphRegistry, externalModulesData);
		const graphEngineData = getGraphEngineData(processedGraphRegistry);
		console.log(graphEngineData);
		audioBackendContext.audioBackend?.setGraph(graphEngineData);
	});

	setMenuVisibilityContexts();
	const isSidebarVisibleContext = getIsSidebarVisibleContext();
	const isCommandPaletteActiveContext = getIsCommandPaletteActiveContext();
</script>

<div class="flex flex-row">
	<NodesPage></NodesPage>
	{#if isSidebarVisibleContext.isSidebarVisible}
		<Sidebar />
	{/if}
</div>

<!-- TODO consider removing it -->
<!-- This is here only to allow other +page.svelte files to use the contexts
declared. -->
{@render children?.()}

{#if isCommandPaletteActiveContext.isCommandPaletteActive}
	<ActionCommandsPalette />
{/if}
