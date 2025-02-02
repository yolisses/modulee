<script lang="ts">
	import { onMount } from 'svelte';

	let audioContext = $state<AudioContext>();
	let isPlaying = $state(false);

	onMount(async () => {
		const response = await fetch('modulee_engine_wasm_bg.wasm');
		const bytes = await response.arrayBuffer();

		audioContext = new AudioContext();
		await audioContext.audioWorklet.addModule('engine-processor.js');
		const engineNode = new AudioWorkletNode(audioContext, 'engine-processor', {
			processorOptions: { bytes },
		});
		engineNode.connect(audioContext.destination);

		isPlaying = audioContext.state === 'running';
	});

	function handleClick() {
		if (!audioContext) return;
		if (isPlaying) {
			audioContext.suspend();
		} else {
			audioContext.resume();
		}
		isPlaying = !isPlaying;
	}
</script>

<button onclick={handleClick}>
	{isPlaying ? 'pause' : 'play'}
</button>
