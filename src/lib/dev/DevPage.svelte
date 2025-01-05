<script lang="ts">
	import { onMount } from 'svelte';
	import { greet } from '../engine/pkg/modulee_engine';

	onMount(() => {
		greet();
	});
</script>

Hello, dev
