<script lang="ts">
	import { onMount } from 'svelte';
	import Oscilloscope from './Oscilloscope.svelte';
	import { OscilloscopeBuffer } from './OscilloscopeBuffer.svelte';

	const chunkSize = 1000;
	let index = 0;
	let wavelength = $state(100.1);

	const oscilloscopeBuffer = new OscilloscopeBuffer(400);
	updateOscilloscope();

	function getNewChunk() {
		const newChunk = [];

		for (let i = 0; i < chunkSize; i++) {
			let newValue = Math.sin(((2 * Math.PI) / wavelength) * index);
			newValue += 0.1 * (2 * Math.random() - 1);
			newChunk.push(newValue);
			index++;
		}
		return newChunk;
	}

	function pushData() {
		const newChunk = getNewChunk();
		newChunk.forEach((value) => {
			oscilloscopeBuffer.push(value);
		});
	}

	function increase() {
		wavelength *= 3;
		updateOscilloscope();
	}

	function decrease() {
		wavelength /= 3;
		updateOscilloscope();
	}

	function updateOscilloscope() {
		const multiplier = Math.max(Math.floor(oscilloscopeBuffer.size / wavelength), 1);
		oscilloscopeBuffer.ratio = oscilloscopeBuffer.size / wavelength / multiplier;
	}

	onMount(() => {
		const handle = setInterval(pushData, 10);
		return () => clearInterval(handle);
	});
</script>

<button onclick={increase}>increase</button>
<button onclick={decrease}>decrease</button>
<Oscilloscope data={oscilloscopeBuffer.buffer} />

<div>
	{oscilloscopeBuffer.ratio}
</div>
<!-- <div>
	{oscilloscopeBuffer.buffer.map((value) => value.toFixed(2)).join(' ')}
</div> -->
