<script lang="ts">
	import { onMount } from 'svelte';

	onMount(async () => {
		const response = await fetch('modulee_engine_wasm_bg.wasm');
		const bytes = await response.arrayBuffer();
		const audioContext = new AudioContext();
		await audioContext.audioWorklet.addModule('engine-processor.js');
		const engineNode = new AudioWorkletNode(audioContext, 'engine-processor', {
			processorOptions: { bytes },
		});
		engineNode.connect(audioContext.destination);
	});
</script>

hello, dev
