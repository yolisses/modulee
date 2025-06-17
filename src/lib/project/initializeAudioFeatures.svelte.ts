import { type AudioBackendContext, setAudioBackendContext } from '$lib/engine/audioBackendContext';
import { getGraphEngineData } from '$lib/engine/data/getGraphEngineData';
import { getHaveJuceSupport } from '$lib/engine/getHaveJuceSupport';
import { type IsMutedContext, setIsMutedContext } from '$lib/engine/isMutedContexts';
import { JuceAudioBackend } from '$lib/engine/JuceAudioBackend';
import { VirtualPianoMidiBackend } from '$lib/engine/VirtualPianoMidiBackend';
import { WasmAudioBackend } from '$lib/engine/WasmAudioBackend';
import { WebMidiBackend } from '$lib/engine/WebMidiBackend';
import { getGraphRegistryContext } from '$lib/graph/graphRegistryContext';
import { getExternalModulesDataContext } from '$lib/module/externalModule/externalModulesDataContext';
import { getProcessedGraphRegistry } from '$lib/process/getProcessedGraphRegistry';
import { onMount } from 'svelte';

/**
 * Initializes the audio, MIDI and virtual piano contexts
 */
export function initializeAudioFeatures() {
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

	const graphRegistryContext = getGraphRegistryContext();
	const externalModulesDataContext = getExternalModulesDataContext();

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
}
