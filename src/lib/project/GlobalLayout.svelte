<script lang="ts">
	import {
		setAudioBackendContext,
		type AudioBackendContext,
	} from '$lib/engine/audioBackendContext';
	import { JuceAudioBackend } from '$lib/engine/JuceAudioBackend';
	import { WasmAudioBackend } from '$lib/engine/WasmAudioBackend';
	import { onMount, type Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	const audioBackendContext: AudioBackendContext = $state({});
	setAudioBackendContext(audioBackendContext);

	onMount(() => {
		if (JuceAudioBackend.canBeCreated()) {
			audioBackendContext.audioBackend = new JuceAudioBackend();
		} else {
			audioBackendContext.audioBackend = new WasmAudioBackend();
		}
	});
</script>

{@render children()}
