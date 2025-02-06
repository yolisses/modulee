<script lang="ts">
	import type { AudioBackend } from '$lib/engine/AudioBackend';
	import {
		setAudioBackendContext,
		type AudioBackendContext,
	} from '$lib/engine/audioBackendContext';
	import { JuceAudioBackend } from '$lib/engine/JuceAudioBackend';
	import { WasmAudioBackend } from '$lib/engine/WasmAudioBackend';
	import { WebMidiBackend } from '$lib/engine/WebMidiBackend';
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	const audioBackendContext: AudioBackendContext = $state({});
	setAudioBackendContext(audioBackendContext);

	onMount(() => {
		let audioBackend: AudioBackend;
		let webMidiBackend: WebMidiBackend | undefined;

		if (JuceAudioBackend.canBeCreated()) {
			audioBackend = new JuceAudioBackend();
		} else {
			audioBackend = new WasmAudioBackend();
			webMidiBackend = new WebMidiBackend(audioBackend);
			webMidiBackend.initialize();
		}

		audioBackendContext.audioBackend = audioBackend;

		return () => {
			audioBackend.destroy();
			webMidiBackend?.destroy();
		};
	});
</script>

{@render children()}
