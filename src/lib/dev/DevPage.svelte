<script lang="ts">
	import { onMount } from 'svelte';
	import Oscilloscope from './Oscilloscope.svelte';
	import { OscilloscopeBuffer } from './OscilloscopeBuffer.svelte';

	const chunkSize = 100;
	let wavelength = 20;
	let index = 0;
	let maxWindowSize = 50;
	const oscilloscopeBuffer = $derived(
		new OscilloscopeBuffer(getWindowSize(wavelength, maxWindowSize)),
	);

	function getWindowSize(num: number, max: number): number {
		const maxMultiple = Math.floor(max / num) * num;
		return maxMultiple === 0 ? num : maxMultiple;
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
		oscilloscopeBuffer.setSize(getWindowSize(wavelength, maxWindowSize));
	}

	function decrease() {
		wavelength -= 3;
		oscilloscopeBuffer.setSize(getWindowSize(wavelength, maxWindowSize));
	}

	onMount(() => {
		const handle = setInterval(pushData, 1000);
		return () => clearInterval(handle);
	});
</script>

<button onclick={increase}>increase</button>
<button onclick={decrease}>decrease</button>
<Oscilloscope data={oscilloscopeBuffer.buffer} />

{oscilloscopeBuffer.buffer.map((value) => value.toFixed(2)).join(' ')}
