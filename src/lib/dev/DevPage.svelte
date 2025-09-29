<script lang="ts">
	import Oscilloscope from './Oscilloscope.svelte';

	let data = $state<number[]>([]);
	let index = 0;
	const wavelength = 10;

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
	}
</script>

<button onclick={pushData}>Add data</button>
<Oscilloscope {data} />
