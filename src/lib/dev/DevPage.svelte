<script lang="ts">
	import { onMount } from 'svelte';
	import Oscilloscope from './Oscilloscope.svelte';
	import { OscilloscopeBuffer } from './OscilloscopeBuffer.svelte';

	const chunkSize = 100;
	let index = 0;
	let maxWindowSize = 50;
	let wavelength = $state(20.1);

	const oscilloscopeBuffer = new OscilloscopeBuffer();
	updateOscilloscope();

	function getWindowSize(num: number, max: number): number {
		return Math.floor(num);
		const maxMultiple = Math.floor(max / num) * num;
		return Math.floor(maxMultiple === 0 ? num : maxMultiple);
	}

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
		wavelength += 3;
		updateOscilloscope();
	}

	function decrease() {
		wavelength -= 3;
		updateOscilloscope();
	}

	function updateOscilloscope() {
		const windowSize = getWindowSize(wavelength, maxWindowSize);
		oscilloscopeBuffer.setSize(windowSize);
		oscilloscopeBuffer.ratio = windowSize / wavelength;
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
<div>
	{oscilloscopeBuffer.buffer.map((value) => value.toFixed(2)).join(' ')}
</div>
