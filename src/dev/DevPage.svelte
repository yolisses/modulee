<script lang="ts">
	import { initialize_logging, set_panic_hook } from 'modulee-engine-wasm';
	import { onMount } from 'svelte';

	async function handleClick() {
		const audioContext = new AudioContext();
		await audioContext.audioWorklet.addModule('engine-processor.js');
		const engineNode = new AudioWorkletNode(audioContext, 'engine-processor');
		engineNode.connect(audioContext.destination);
	}

	onMount(() => {
		set_panic_hook();
		initialize_logging();
	});
</script>

<button class="common-button" onclick={handleClick}> Click me </button>
