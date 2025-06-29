<script lang="ts">
	import { setGraphContext } from '$lib/data/graphContext';
	import ActionCommandsPalette from$lib/graph/graphContextmmandsPalette.svelte';
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { getIsCommandPaletteActiveContext } from '$lib/editor/isCommandPaletteActiveContext';
	import { Graph } from '$lib/graph/Graph.svelte';
	import { setGraphRegistryContext } from '$lib/graph/graphRegistryContext';
	import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
	import {
		getExternalModulesDataContext,
		setExternalModulesDataContext,
	} from '$lib/module/externalModule/externalModulesDataContext';
	import { setInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { setUseExternalModuleInContext } from '$lib/module/internalModule/useExternalModuleInContext';
	import { getGraphData } from '$lib/project/getGraphData';
	import ProjectNavbar from '$lib/project/ProjectNavbar.svelte';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	import { setDefaultContexts } from 'nodes-editor';
	import { onMount, type Snippet } from 'svelte';
	import { getGraphRegistry } from './getGraphRegistry';
	import { initializeAudioFeatures } from './initializeAudioFeatures.svelte';
	import type { ProjectData } from './ProjectData';
	import { getProjectDataContext, setProjectDataContext } from './projectDataContext';
	import {
		type ProjectNavbarSelectionContext,
		setProjectNavbarSelectionContext,
	} from './projectNavbarSelectionContext';
	import { setMenuVisibilityContexts } from './setMenuVisibilityContexts.svelte';

	interface Props {
		children: Snippet;
		projectData: ProjectData;
		externalModulesData: ExternalModuleData[];
	}

	const { children, projectData, externalModulesData }: Props = $props();

	const baseRouteContext = getBaseRouteContext();
	onMount(() => {
		baseRouteContext.baseRoute = `/projects/${projectData.id}`;
	});

	setMenuVisibilityContexts();
	setProjectDataContext({ projectData });
	setExternalModulesDataContext({ externalModulesData });

	const internalModuleIdContext = $state({
		internalModuleId: projectData.graph.mainInternalModuleId,
	});
	setInternalModuleIdContext(internalModuleIdContext);

	const projectDataContext = getProjectDataContext();
	const isCommandPaletteActiveContext = getIsCommandPaletteActiveContext();

	const graphRegistryContext = $state({
		graphRegistry: getGraphRegistry(projectDataContext.projectData.graph, externalModulesData),
	});
	setGraphRegistryContext(graphRegistryContext);

	const externalModulesDataContext = getExternalModulesDataContext();

	const graph = new Graph(
		graphRegistryContext.graphRegistry,
		externalModulesDataContext.externalModulesData,
	);
	const graphContext = $state({ graph });
	setGraphContext(graphContext);

	setDefaultContexts();

	const editor = new Editor(graphRegistryContext.graphRegistry);

	editor.onExecute = (command, graphRegistry) => {
		graphRegistryContext.graphRegistry = graphRegistry;
		graphContext.graph = new Graph(
			graphRegistryContext.graphRegistry,
			externalModulesDataContext.externalModulesData,
		);

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
</script>

<svelte:head>
	<title>{projectDataContext.projectData.name} - Modulee</title>
</svelte:head>
<div class="flex h-screen w-screen overflow-hidden max-md:flex-col md:flex-row">
	<div class="flex flex-1 flex-col overflow-hidden md:order-2">
		{@render children?.()}
	</div>
	<ProjectNavbar />
</div>

{#if isCommandPaletteActiveContext.isCommandPaletteActive}
	<ActionCommandsPalette />
{/if}
