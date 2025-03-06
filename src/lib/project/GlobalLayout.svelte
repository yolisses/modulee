<script lang="ts">
	import { page } from '$app/state';
	import {
		setAudioBackendContext,
		type AudioBackendContext,
	} from '$lib/engine/audioBackendContext';
	import { getHaveJuceSupport } from '$lib/engine/getHaveJuceSupport';
	import { setIsMutedContext, type IsMutedContext } from '$lib/engine/isMutedContexts';
	import { JuceAudioBackend } from '$lib/engine/JuceAudioBackend';
	import { VirtualPianoMidiBackend } from '$lib/engine/VirtualPianoMidiBackend';
	import { WasmAudioBackend } from '$lib/engine/WasmAudioBackend';
	import { WebMidiBackend } from '$lib/engine/WebMidiBackend';
	import { onMount, type Snippet } from 'svelte';
	import {
		setProjectsRepositoryContext,
		type ProjectsRepositoryContext,
	} from './projectsRepositoryContext';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	const audioBackendContext: AudioBackendContext = $state({});
	setAudioBackendContext(audioBackendContext);

	const isMutedContext: IsMutedContext = $state({ isMuted: false });
	setIsMutedContext(isMutedContext);

	const projectsRepositoryContext: ProjectsRepositoryContext = $state({});
	setProjectsRepositoryContext(projectsRepositoryContext);

	$effect(() => {
		const { isMuted } = isMutedContext;
		const { audioBackend } = audioBackendContext;
		audioBackend?.setIsMuted(isMuted);
	});

	onMount(() => {
		if (getHaveJuceSupport()) {
			const audioBackend = new JuceAudioBackend();
			audioBackendContext.audioBackend = audioBackend;

			return () => {
				audioBackend.destroy();
			};
		}
	});

	onMount(() => {
		if (!getHaveJuceSupport()) {
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
		const url = new URL(page.url);
		const path = url.pathname;
		window.__JUCE__?.backend.emitEvent('setPath', { path });
	});
</script>

{@render children()}
