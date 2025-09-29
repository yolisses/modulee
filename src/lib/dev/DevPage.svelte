<script lang="ts">
	import { onMount } from 'svelte';
	import { CircularBuffer } from './CircularBuffer.svelte';
	import Oscilloscope from './Oscilloscope.svelte';

	const chunkSize = 100;
	const wavelength = 20;
	let index = 0;
	const circularBuffer = $derived(new CircularBuffer(wavelength));

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
			circularBuffer.push(value);
		});
	}

	onMount(() => {
		const handle = setInterval(pushData, 100);
		return () => clearInterval(handle);
	});
</script>

<button onclick={pushData}>Add data</button>
<Oscilloscope data={circularBuffer.buffer} />

{circularBuffer.buffer.map((value) => value.toFixed(2)).join(' ')}
