<script lang="ts">
	import type { Input } from '$lib/data/Input.svelte';

	interface Props {
		input: Input;
	}

	const { input }: Props = $props();
	let value = $state(0.2);
	const max = 1;
	const min = 0;
</script>

<div>{input.name}</div>
<input type="range" bind:value {max} {min} step="any" />
<input type="text" bind:value class="text-center" />
