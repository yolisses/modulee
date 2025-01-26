<script lang="ts">
	import type { Output } from '$lib/data/Output.svelte.js';
	import ConnectorItem from './ConnectorItem.svelte';

	interface Props {
		output: Output;
	}

	const { output }: Props = $props();
</script>

<ConnectorItem connector={output} direction="right" />
