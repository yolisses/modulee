<script lang="ts">
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
		const audioBackend = JuceAudioBackend.canBeCreated()
			? new JuceAudioBackend()
			: new WasmAudioBackend();
		audioBackendContext.audioBackend = audioBackend;

		const webMidiBackend = new WebMidiBackend(audioBackend);
		webMidiBackend.initialize();

		return () => {
			audioBackend.destroy();
			webMidiBackend.destroy();
		};
	});
</script>

{@render children()}
