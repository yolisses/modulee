import { type AudioBackendContext, setAudioBackendContext } from '$lib/audio/audioBackendContext';
import { getGraphEngineData } from '$lib/audio/data/getGraphEngineData';
import { getHasJuceSupport } from '$lib/audio/getHaveJuceSupport';
import { JuceAudioBackend } from '$lib/audio/JuceAudioBackend';
import { VirtualPianoMidiBackend } from '$lib/audio/VirtualPianoMidiBackend';
import { WasmAudioBackend } from '$lib/audio/WasmAudioBackend';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import { graphRegistryContextKey } from '$lib/graph/graphRegistryContext';
import { activePitchesContextKey } from '$lib/piano/activePitchesContext';
import { getProcessedGraphRegistry } from '$lib/process/getProcessedGraphRegistry';
import { onMount } from 'svelte';
import { type IsMutedContext, setIsMutedContext } from './isMutedContexts';

/**
 * Initializes the audio, MIDI and virtual piano contexts
 */
export function initializeAudioFeatures() {
	const activePitchesContext = getRequiredContext(activePitchesContextKey);
	const graphRegistryContext = getRequiredContext(graphRegistryContextKey);

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
		if (getHasJuceSupport()) {
			const audioBackend = new JuceAudioBackend();
			audioBackendContext.audioBackend = audioBackend;

			const virtualPianoMidiBackend = new VirtualPianoMidiBackend(
				audioBackend,
				activePitchesContext.activePitches,
			);
			virtualPianoMidiBackend.initialize();

			return () => {
				audioBackend.destroy();
				virtualPianoMidiBackend.destroy();
			};
		} else {
			const audioBackend = new WasmAudioBackend();
			audioBackendContext.audioBackend = audioBackend;

			const virtualPianoMidiBackend = new VirtualPianoMidiBackend(
				audioBackend,
				activePitchesContext.activePitches,
			);
			virtualPianoMidiBackend.initialize();

			return () => {
				audioBackend.destroy();
				virtualPianoMidiBackend.destroy();
			};
		}
	});

	$effect(() => {
		// An error on updating the audio graph should not stop the full
		// application
		try {
			const { graphRegistry } = graphRegistryContext;
			const processedGraphRegistry = getProcessedGraphRegistry(graphRegistry);
			const graphEngineData = getGraphEngineData(processedGraphRegistry);
			audioBackendContext.audioBackend?.setGraph(graphEngineData);
		} catch (e) {
			console.error(e);
		}
	});
}
