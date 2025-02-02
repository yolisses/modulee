<script lang="ts">
	import { Graph, initialize_logging, set_panic_hook } from 'modulee-engine-wasm';
	import { onMount } from 'svelte';

	function handleClick() {
		const graph = new Graph();

		const buffer = new Float32Array(100);
		graph.process_block(buffer, buffer.length);
		console.log(buffer);
	}

	onMount(() => {
		set_panic_hook();
		initialize_logging();
	});
</script>

<button class="common-button" onclick={handleClick}> Click me </button>
