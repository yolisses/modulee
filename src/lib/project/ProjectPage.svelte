<script lang="ts">
	import CommandPalette from '$lib/CommandPalette/CommandPalette.svelte';
	import { createCommand } from '$lib/commands/createCommand';
	import { Graph } from '$lib/data/Graph.svelte';
	import { setGraphContext } from '$lib/data/graphContext';
	import type { GraphData } from '$lib/data/GraphData';
	import { ById } from '$lib/editor/ById';
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
	import { getGraphEngineData } from '$lib/engine/data/getGraphEngineData';
	import { setGroupIdContext } from '$lib/group/groupIdContext';
	import { setIsLateralBarVisibleContext } from '$lib/lateralBar/isLateralBarVisibleContext';
	import LateralBar from '$lib/lateralBar/LateralBar.svelte';
	import { setSelectedTabContext } from '$lib/lateralBar/selectedTabContext';
	import NodesPage from '$lib/node/NodesPage.svelte';
	import { getProcessedGraphData } from '$lib/process/getProcessedGraphData';
	import { setDefaultContexts } from 'nodes-editor';
	import { type Snippet } from 'svelte';
	import type { ProjectData } from './ProjectData';
	import { getProjectDataContext } from './projectDataContext';
	import { getProjectsRepositoryContext } from './projectsRepositoryContext';

	interface Props {
		children: Snippet;
		projectData: ProjectData;
	}

	let isLateralBarVisibleContext = $state({ isLateralBarVisible: true });
	setIsLateralBarVisibleContext(isLateralBarVisibleContext);

	setDefaultContexts();

	const { children, projectData }: Props = $props();

	const projectDataContext = getProjectDataContext();
	projectDataContext.projectData = projectData;

	const selectedTabContext = $state({ selectedTab: 'group' });
	setSelectedTabContext(selectedTabContext);

	const groupContext = $state({ groupId: projectData.mainGroup.id });
	setGroupIdContext(groupContext);

	// TODO find a more encapsulated way to execute this initial changes
	const initialGraphData: GraphData = {
		nodes: new ById(),
		connections: new ById(),
		mainGroupId: projectData.mainGroup.id,
		groups: ById.fromItems([structuredClone(projectData.mainGroup)]),
	};

	const graph = new Graph(initialGraphData);
	const graphContext = $state({ graph });
	setGraphContext(graphContext);

	const editor = new Editor(initialGraphData, { history: [], undoneHistory: [] });
	editor.setGraph = (graph: Graph) => {
		graphContext.graph = graph;
	};

	projectData.commands.map((commandData) => {
		const command = createCommand(commandData);
		editor.execute(command);
	});

	const projectsRepositoryContext = getProjectsRepositoryContext();
	editor.onExecute = (command) => {
		const { projectsRepository } = projectsRepositoryContext;
		projectsRepository?.addCommand(command.commandData);
	};

	const editorContext = $state({ editor });
	setEditorContext(editorContext);

	const audioBackendContext = getAudioBackendContext();
	$effect(() => {
		const processedGraphData = getProcessedGraphData(graphContext.graph.getData());
		const graphEngineData = getGraphEngineData(processedGraphData);
		audioBackendContext.audioBackend?.setGraph(graphEngineData);
	});

	let isCommandPaletteActive = $state(true);
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

{#if isCommandPaletteActive}
	<CommandPalette bind:isActive={isCommandPaletteActive} />
{/if}
