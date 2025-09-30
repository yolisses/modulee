<script lang="ts">
	import { onMount } from 'svelte';
	import '../juce/index';
	import { getNativeFunction } from '../juce/index';

	onMount(() => {
		const getOscilloscopeData = getNativeFunction('getOscilloscopeData');
		getOscilloscopeData().then(console.log);
	});
</script>

hello dev
