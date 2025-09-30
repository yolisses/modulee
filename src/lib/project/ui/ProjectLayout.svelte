<script lang="ts">
	import { initializeAudioFeatures } from '$lib/audio/initializeAudioFeatures.svelte';
	import MuteButton from '$lib/audio/MuteButton.svelte';
	import { oscilloscopeHandlerContextKey } from '$lib/audio/oscilloscopeHandlerContext';
	import ActionCommandsPalette from '$lib/editor/ActionCommandsPalette.svelte';
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { isCommandPaletteActiveContextKey } from '$lib/editor/isCommandPaletteActiveContext';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { Graph } from '$lib/graph/Graph.svelte';
	import { setGraphContext } from '$lib/graph/graphContext';
	import { setGraphRegistryContext } from '$lib/graph/graphRegistryContext';
	import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
	import { internalModuleIdContextKey } from '$lib/module/internalModule/internalModuleIdContext';
	import { setUseExternalModuleInContext } from '$lib/module/internalModule/useExternalModuleInContext';
	import { setActivePitchesContext } from '$lib/piano/activePitchesContext';
	import { updateContext } from '$lib/shortcut/contextsContext';
	import { baseRouteContextKey } from '$lib/ui/baseRouteContext';
	import { selectedNodeIdsContextKey, setDefaultContexts } from 'nodes-editor';
	import { type Snippet, onMount, setContext } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import type { ProjectData } from '../data/ProjectData';
	import { getGraphData } from '../getGraphData';
	import { getGraphRegistry } from '../getGraphRegistry';
	import {
		type ProjectNavbarSelectionContext,
		setProjectNavbarSelectionContext,
	} from '../projectNavbarSelectionContext';
	import { setMenuVisibilityContexts } from '../setMenuVisibilityContexts.svelte';
	import Scope from './Oscilloscope.svelte';
	import { projectDataContextKey, setProjectDataContext } from './projectDataContext';
	import ProjectNavbar from './ProjectNavbar.svelte';
	import { type ProjectToolbarContext, setProjectToolbarContext } from './projectToobalContext';

	interface Props {
		children: Snippet;
		projectData: ProjectData;
		externalModulesData: ExternalModuleData[];
	}

	setActivePitchesContext({ activePitches: new SvelteSet() });

	const { children, projectData, externalModulesData }: Props = $props();

	const baseRouteContext = getRequiredContext(baseRouteContextKey);
	onMount(() => {
		baseRouteContext.baseRoute = `/projects/${projectData.id}`;
	});

	setMenuVisibilityContexts();
	setProjectDataContext({ projectData });

	const internalModuleIdContext = $state({
		internalModuleId: projectData.graph.mainInternalModuleId,
	});
	setContext(internalModuleIdContextKey, internalModuleIdContext);
	updateContext(internalModuleIdContextKey);

	const projectDataContext = getRequiredContext(projectDataContextKey);
	const isCommandPaletteActiveContext = getRequiredContext(isCommandPaletteActiveContextKey);

	const graphRegistryContext = $state({
		graphRegistry: getGraphRegistry(projectDataContext.projectData.graph, externalModulesData),
	});
	setGraphRegistryContext(graphRegistryContext);

	const graph = new Graph(graphRegistryContext.graphRegistry);
	const graphContext = $state({ graph });
	setGraphContext(graphContext);

	setDefaultContexts();
	updateContext(selectedNodeIdsContextKey);

	const editor = new Editor(graphRegistryContext.graphRegistry);

	editor.onExecute = (command, graphRegistry) => {
		graphRegistryContext.graphRegistry = graphRegistry;
		graphContext.graph = new Graph(graphRegistryContext.graphRegistry);

		const graphData = getGraphData(graphRegistry);

		projectDataContext.projectData.graph = graphData;

		fetch(`/api/projects/${projectData.id}`, {
			method: 'PATCH',
			body: JSON.stringify({ graph: graphData }),
		});
	};

	const editorContext = $state({ editor });
	setEditorContext(editorContext);

	const projectNavbarSelectionContext: ProjectNavbarSelectionContext = $state({
		projectNavbarSelection: '',
	});
	setProjectNavbarSelectionContext(projectNavbarSelectionContext);

	const useExternalModuleInContext = $state({});
	setUseExternalModuleInContext(useExternalModuleInContext);

	initializeAudioFeatures();

	const projectToolbarContext = $state({} as ProjectToolbarContext);
	setProjectToolbarContext(projectToolbarContext);

	const oscilloscopeHandlerContext = getRequiredContext(oscilloscopeHandlerContextKey);
</script>

<svelte:head>
	<title>{projectDataContext.projectData.name} - Modulee</title>
</svelte:head>
<div class="flex h-svh w-screen overflow-hidden max-md:flex-col md:flex-row">
	<div class="flex flex-1 flex-col overflow-hidden md:order-2">
		<div class="flex flex-1 flex-col overflow-hidden">
			{@render children?.()}
		</div>
		<div
			bind:this={projectToolbarContext.projectToolbar}
			class="flex flex-row items-start overflow-auto border-t-2 border-black/50 max-md:justify-between"
		>
			<UndoButton />
			<RedoButton />
			<MuteButton />
			{#if oscilloscopeHandlerContext.oscilloscopeHandler}
				<Scope oscilloscopeHandler={oscilloscopeHandlerContext.oscilloscopeHandler} />
			{/if}
		</div>
	</div>
	<ProjectNavbar />
</div>

{#if isCommandPaletteActiveContext.isCommandPaletteActive}
	<ActionCommandsPalette />
{/if}
