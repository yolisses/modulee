<script lang="ts">
	import { onMount } from 'svelte';
	import * as modulee_engine_wasm_bg from './modulee_engine_wasm_bg';
	import { __wbg_set_wasm, Graph, initialize_logging } from './modulee_engine_wasm_bg';

	onMount(async () => {
		const response = await fetch('modulee_engine_wasm_bg.wasm');
		const bytes = await response.arrayBuffer();
		const result = await WebAssembly.instantiate(bytes, {
			'./modulee_engine_wasm_bg.js': modulee_engine_wasm_bg,
		});
		const wasm = result.instance.exports;
		__wbg_set_wasm(wasm);

		initialize_logging();

		const graph = new Graph();
		graph.set_debug_string('test');
		console.log(graph.get_debug_value());

		// const audioContext = new AudioContext();
		// await audioContext.audioWorklet.addModule('engine-processor.js');
		// const engineNode = new AudioWorkletNode(audioContext, 'engine-processor', {
		// 	processorOptions: {
		// 		instance: result.module,
		// 	},
		// });
		// engineNode.connect(audioContext.destination);
	});
</script>

hello, dev
