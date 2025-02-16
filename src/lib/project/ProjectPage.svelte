<script lang="ts">
	import { Graph } from '$lib/data/Graph.svelte';
	import { setGraphContext } from '$lib/data/graphContext';
	import type { GraphData } from '$lib/data/GraphData';
	import { ById } from '$lib/editor/ById';
	import { createCommand } from '$lib/editor/createCommand';
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
	import { getGraphEngineData } from '$lib/engine/data/getGraphEngineData';
	import { setGroupIdContext } from '$lib/group/groupIdContext';
	import LateralBar from '$lib/lateralBar/LateralBar.svelte';
	import { setSelectedTabContext } from '$lib/lateralBar/selectedTabContext';
	import NodesPage from '$lib/node/NodesPage.svelte';
	import { getProcessedGraphData } from '$lib/process/getProcessedGraphData';
	import HomeButton from '$lib/ui/HomeButton.svelte';
	import { setDefaultContexts } from 'nodes-editor';
	import { type Snippet } from 'svelte';
	import type { ProjectData } from './ProjectData';
	import { setProjectDataContext } from './projectDataContext';
	import type { ProjectsRepository } from './ProjectsRepository';

	interface Props {
		children: Snippet;
		projectData: ProjectData;
		projectsRepository: ProjectsRepository;
	}

	setDefaultContexts();

	const { children, projectData, projectsRepository }: Props = $props();

	const selectedTabContext = $state({ selectedTab: 'group' });
	setSelectedTabContext(selectedTabContext);

	const groupContext = $state({ groupId: projectData.mainGroup.id });
	setGroupIdContext(groupContext);

	const projectDataContext = $state({ projectData });
	setProjectDataContext(projectDataContext);

	// TODO find a more encapsulated way to execute this initial changes

	const initialGraphData: GraphData = {
		nodes: new ById(),
		connections: new ById(),
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

	editor.onExecute = (command) => {
		projectsRepository.addCommand(command.commandData);
	};

	const editorContext = $state({ editor });
	setEditorContext(editorContext);

	const audioBackendContext = getAudioBackendContext();
	$effect(() => {
		const processedGraphData = getProcessedGraphData(graphContext.graph.getData());
		const graphEngineData = getGraphEngineData(processedGraphData);

		// TODO replace by setGraph
		audioBackendContext.audioBackend?.setGroups(graphEngineData.groups);

		const mainGroupId = projectData.mainGroup.id;
		audioBackendContext.audioBackend?.setMainGroupId(mainGroupId);
	});
</script>

<div class="flex flex-row">
	<NodesPage>
		{#snippet topBarChildren()}
			<HomeButton />
		{/snippet}
	</NodesPage>
	<LateralBar />
</div>

<!-- TODO consider removing it -->
<!-- This is here only to allow other +page.svelte files to use the contexts
declared. -->
{@render children?.()}
