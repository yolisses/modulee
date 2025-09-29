<script lang="ts">
	import { onMount } from 'svelte';
	import Oscilloscope from './Oscilloscope.svelte';

	let data = $state<number[]>([]);
	let index = 0;
	const maxSize = 10;
	const wavelength = 7;

	function getNewChunk() {
		const newChunk = [];

		for (let i = 0; i < 20; i++) {
			const newValue = Math.sin(((2 * Math.PI) / wavelength) * index);
			newChunk.push(newValue);
			index++;
		}
		return newChunk;
	}

	function pushData() {
		const newChunk = getNewChunk();
		data = [...data, ...newChunk];
		data = data.slice(-maxSize);
	}

	onMount(() => {
		const handle = setInterval(pushData, 1000);
		return () => clearInterval(handle);
	});
</script>

<button onclick={pushData}>Add data</button>
<Oscilloscope {data} />

{data.map((value) => value.toFixed(2)).join(' ')}
