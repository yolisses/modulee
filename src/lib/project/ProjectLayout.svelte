<script lang="ts">
	import { Graph } from '$lib/data/Graph.svelte';
	import { setGraphContext } from '$lib/data/graphContext';
	import ActionCommandsPalette from '$lib/editor/ActionCommandsPalette.svelte';
	import { Editor } from '$lib/editor/Editor.svelte';
	import { setEditorContext } from '$lib/editor/editorContext';
	import { getIsCommandPaletteActiveContext } from '$lib/editor/isCommandPaletteActiveContext';
	import {
		type AudioBackendContext,
		setAudioBackendContext,
	} from '$lib/engine/audioBackendContext';
	import { getGraphEngineData } from '$lib/engine/data/getGraphEngineData';
	import { getHaveJuceSupport } from '$lib/engine/getHaveJuceSupport';
	import { type IsMutedContext, setIsMutedContext } from '$lib/engine/isMutedContexts';
	import { JuceAudioBackend } from '$lib/engine/JuceAudioBackend';
	import { VirtualPianoMidiBackend } from '$lib/engine/VirtualPianoMidiBackend';
	import { WasmAudioBackend } from '$lib/engine/WasmAudioBackend';
	import { WebMidiBackend } from '$lib/engine/WebMidiBackend';
	import { setGraphRegistryContext } from '$lib/graph/graphRegistryContext';
	import type { ExternalModuleData } from '$lib/module/externalModule/ExternalModuleData';
	import {
		getExternalModulesDataContext,
		setExternalModulesDataContext,
	} from '$lib/module/externalModule/externalModulesDataContext';
	import { setInternalModuleIdContext } from '$lib/module/internalModule/internalModuleIdContext';
	import { getProcessedGraphRegistry } from '$lib/process/getProcessedGraphRegistry';
	import { getGraphData } from '$lib/project/getGraphData';
	import ProjectSidebar from '$lib/project/ProjectSidebar.svelte';
	import { getBaseRouteContext } from '$lib/ui/baseRouteContext';
	import { setDefaultContexts } from 'nodes-editor';
	import { onMount, type Snippet } from 'svelte';
	import { getGraphRegistry } from './getGraphRegistry';
	import type { ProjectData } from './ProjectData';
	import { getProjectDataContext, setProjectDataContext } from './projectDataContext';
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
		graphRegistry: getGraphRegistry(projectDataContext.projectData.graph),
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

	const audioBackendContext: AudioBackendContext = $state({});
	setAudioBackendContext(audioBackendContext);

	const isMutedContext: IsMutedContext = $state({ isMuted: false });
	setIsMutedContext(isMutedContext);

	$effect(() => {
		const { isMuted } = isMutedContext;
		const { audioBackend } = audioBackendContext;
		audioBackend?.setIsMuted(isMuted);
	});

	onMount(() => {
		if (getHaveJuceSupport()) {
			const audioBackend = new JuceAudioBackend();
			audioBackendContext.audioBackend = audioBackend;

			const virtualPianoMidiBackend = new VirtualPianoMidiBackend(audioBackend);
			virtualPianoMidiBackend.initialize();

			return () => {
				audioBackend.destroy();
				virtualPianoMidiBackend.destroy();
			};
		} else {
			const audioBackend = new WasmAudioBackend();
			audioBackendContext.audioBackend = audioBackend;

			const webMidiBackend = new WebMidiBackend(audioBackend);
			webMidiBackend.initialize();

			const virtualPianoMidiBackend = new VirtualPianoMidiBackend(audioBackend);
			virtualPianoMidiBackend.initialize();

			return () => {
				audioBackend.destroy();
				webMidiBackend.destroy();
				virtualPianoMidiBackend.destroy();
			};
		}
	});

	$effect(() => {
		// An error on updating the audio graph should not stop the full
		// application
		try {
			const { graphRegistry } = graphRegistryContext;
			const { externalModulesData } = externalModulesDataContext;
			const processedGraphRegistry = getProcessedGraphRegistry(graphRegistry, externalModulesData);
			const graphEngineData = getGraphEngineData(processedGraphRegistry);
			audioBackendContext.audioBackend?.setGraph(graphEngineData);
		} catch (e) {
			console.error(e);
		}
	});
</script>

<svelte:head>
	<title>{projectDataContext.projectData.name} - Modulee</title>
</svelte:head>
<div class="flex h-screen w-screen flex-row overflow-hidden">
	<ProjectSidebar />
	<div class="flex flex-1 flex-col overflow-hidden">
		{@render children?.()}
	</div>
</div>

{#if isCommandPaletteActiveContext.isCommandPaletteActive}
	<ActionCommandsPalette />
{/if}
