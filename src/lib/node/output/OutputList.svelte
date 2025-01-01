<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import type { Output } from './Output.svelte';
	import OutputItem from './OutputItem.svelte';

	interface Props {
		space: Space;
		outputs: Output[];
	}

	let { space, outputs }: Props = $props();
</script>

{#each outputs as output (output.id)}
	<OutputItem {space} {output} />
{/each}
