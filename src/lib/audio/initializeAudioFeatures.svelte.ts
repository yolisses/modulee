import { type AudioBackendContext, setAudioBackendContext } from '$lib/audio/audioBackendContext';
import { getGraphEngineData } from '$lib/audio/data/getGraphEngineData';
import { getHasJuceSupport } from '$lib/audio/getHasJuceSupport';
import { getRequiredContext } from '$lib/global/getRequiredContext';
import { graphRegistryContextKey } from '$lib/graph/graphRegistryContext';
import { setActivePitchesContext } from '$lib/piano/activePitchesContext';
import { getProcessedGraphRegistry } from '$lib/process/getProcessedGraphRegistry';
import { onMount } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import { initializeJuceAudioFeatures } from './initializeJuceAudioFeatures';
import { initializeWebAudioFeatures } from './initializeWebAudioFeatures';
import { type IsMutedContext, setIsMutedContext } from './isMutedContexts';
import {
	type OscilloscopeBackendContext,
	setOscilloscopeBackendContext,
} from './oscilloscopeBackendContext';

/**
 * Initializes the audio, MIDI and virtual piano contexts
 */
export function initializeAudioFeatures() {
	const activePitchesContext = { activePitches: new SvelteSet<number>() };
	setActivePitchesContext(activePitchesContext);

	const audioBackendContext: AudioBackendContext = $state({});
	setAudioBackendContext(audioBackendContext);

	const isMutedContext: IsMutedContext = $state({ isMuted: false });
	setIsMutedContext(isMutedContext);

	const oscilloscopeBackendContext: OscilloscopeBackendContext = $state({});
	setOscilloscopeBackendContext(oscilloscopeBackendContext);

	onMount(() => {
		if (getHasJuceSupport()) {
			initializeJuceAudioFeatures();
		} else {
			initializeWebAudioFeatures();
		}
	});

	$effect(() => {
		const { isMuted } = isMutedContext;
		const { audioBackend } = audioBackendContext;
		audioBackend?.setIsMuted(isMuted);
	});

	const graphRegistryContext = getRequiredContext(graphRegistryContextKey);
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

	$effect(() => {
		if (activePitchesContext.activePitches.size == 0) return;
		const minPitch = Math.min(...activePitchesContext.activePitches);
		oscilloscopeBackendContext.oscilloscopeBackend?.setPitch(minPitch);
	});
}
