<script lang="ts">
	import ActionCommandsPalette from '$lib/CommandPalette/ActionCommandsPalette.svelte';
	import { getIsCommandPaletteActiveContext } from '$lib/CommandPalette/isCommandPaletteActiveContext';
	import { createEditorCommand } from '$lib/commands/createEditorCommand';
	import { Graph } from '$lib/data/Graph.svelte';
	import { setGraphContext } from '$lib/data/graphContext';
	import type { GraphData } from '$lib/data/GraphData';
	import { ById } from '$lib/editor/ById';
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
	import { getGraphEngineData } from '$lib/engine/data/getGraphEngineData';
	import { setGraphDataContext } from '$lib/graph/graphDataContext';
	import { setGroupIdContext } from '$lib/group/groupIdContext';
	import { getIsLateralBarVisibleContext } from '$lib/lateralBar/isLateralBarVisibleContext';
	import LateralBar from '$lib/lateralBar/LateralBar.svelte';
	import { setSelectedTabContext } from '$lib/lateralBar/selectedTabContext';
	import NodesPage from '$lib/node/NodesPage.svelte';
	import { getProcessedGraphData } from '$lib/process/getProcessedGraphData';
	import { setDefaultContexts } from 'nodes-editor';
	import { type Snippet } from 'svelte';
	import { getProjectsRepository } from './getProjectsRepository';
	import { getProjectDataContext } from './projectDataContext';
	import { setMenuVisibilityContexts } from './setMenuVisibilityContexts.svelte';

	interface Props {
		children: Snippet;
	}

	setDefaultContexts();

	const { children }: Props = $props();

	const projectDataContext = getProjectDataContext();

	const selectedTabContext = $state({ selectedTab: 'project' });
	setSelectedTabContext(selectedTabContext);

	const groupContext = $state({ groupId: projectDataContext.projectData.mainGroup.id });
	setGroupIdContext(groupContext);

	// TODO find a more encapsulated way to execute this initial changes
	// TODO move to a separate function
	const initialGraphData: GraphData = {
		nodes: new ById(),
		connections: new ById(),
		mainGroupId: projectDataContext.projectData.mainGroup.id,
		groups: ById.fromItems([structuredClone(projectDataContext.projectData.mainGroup)]),
	};

	const graphDataContext = $state({ graphData: initialGraphData });
	setGraphDataContext(graphDataContext);

	const graph = new Graph(graphDataContext.graphData);
	const graphContext = $state({ graph });
	setGraphContext(graphContext);

	const editor = new Editor(initialGraphData);
	editor.setGraphData = (graphData) => {
		graphDataContext.graphData = graphData;
		graphContext.graph = new Graph(graphDataContext.graphData);
	};

	projectDataContext.projectData.commands.map((commandData) => {
		const command = createEditorCommand(commandData);
		editor.execute(command);
	});

	editor.onExecute = (command) => {
		const projectsRepository = getProjectsRepository();
		projectsRepository.addCommand(command.commandData);
	};

	const editorContext = $state({ editor });
	setEditorContext(editorContext);

	const audioBackendContext = getAudioBackendContext();
	$effect(() => {
		const processedGraphData = getProcessedGraphData(graphDataContext.graphData);
		const graphEngineData = getGraphEngineData(processedGraphData);
		audioBackendContext.audioBackend?.setGraph(graphEngineData);
	});

	setMenuVisibilityContexts();
	const isLateralBarVisibleContext = getIsLateralBarVisibleContext();
	const isCommandPaletteActiveContext = getIsCommandPaletteActiveContext();
</script>

<div class="flex flex-row">
	<NodesPage></NodesPage>
	{#if isLateralBarVisibleContext.isLateralBarVisible}
		<LateralBar />
	{/if}
</div>

<!-- TODO consider removing it -->
<!-- This is here only to allow other +page.svelte files to use the contexts
declared. -->
{@render children?.()}

{#if isCommandPaletteActiveContext.isCommandPaletteActive}
	<ActionCommandsPalette />
{/if}
