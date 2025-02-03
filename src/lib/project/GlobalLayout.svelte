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
		const audioBackend = JuceAudioBackend.canBeCreated()
			? new JuceAudioBackend()
			: new WasmAudioBackend();
		audioBackendContext.audioBackend = audioBackend;
		return () => {
			audioBackend.destroy();
		};
	});
</script>

{@render children()}
