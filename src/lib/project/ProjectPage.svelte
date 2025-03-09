<script lang="ts">
	import ActionCommandsPalette from '$lib/CommandPalette/ActionCommandsPalette.svelte';
	import { getIsCommandPaletteActiveContext } from '$lib/CommandPalette/isCommandPaletteActiveContext';
	import { createEditorCommand } from '$lib/commands/createEditorCommand';
	import { Graph } from '$lib/data/Graph.svelte';
	import { setGraphContext } from '$lib/data/graphContext';
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { getAudioBackendContext } from '$lib/engine/audioBackendContext';
	import { getGraphEngineData } from '$lib/engine/data/getGraphEngineData';
	import { setGraphRegistryContext } from '$lib/graph/graphRegistryContext';
	import { setGroupIdContext } from '$lib/group/groupIdContext';
	import { getIsLateralBarVisibleContext } from '$lib/lateralBar/isLateralBarVisibleContext';
	import LateralBar from '$lib/lateralBar/LateralBar.svelte';
	import { setSelectedTabContext } from '$lib/lateralBar/selectedTabContext';
	import NodesPage from '$lib/node/NodesPage.svelte';
	import { getProcessedGraphRegistry } from '$lib/process/getProcessedGraphRegistry';
	import { setDefaultContexts } from 'nodes-editor';
	import { type Snippet } from 'svelte';
	import { createInitialGraphRegistry } from './createInitialGraphRegistry';
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

	const graphRegistryContext = $state({
		graphRegistry: createInitialGraphRegistry(projectDataContext.projectData),
	});
	setGraphRegistryContext(graphRegistryContext);

	const graph = new Graph(graphRegistryContext.graphRegistry);
	const graphContext = $state({ graph });
	setGraphContext(graphContext);

	const editor = new Editor(graphRegistryContext.graphRegistry);
	editor.setGraphRegistry = (graphRegistry) => {
		graphRegistryContext.graphRegistry = graphRegistry;
		graphContext.graph = new Graph(graphRegistryContext.graphRegistry);
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
		const processedGraphRegistry = getProcessedGraphRegistry(graphRegistryContext.graphRegistry);
		const graphEngineData = getGraphEngineData(processedGraphRegistry);
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
