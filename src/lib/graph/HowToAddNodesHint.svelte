<script lang="ts">
	import type { Node } from '$lib/data/Node.svelte';

	interface Props {
		nodes: Node[];
	}

	const { nodes }: Props = $props();
</script>

{#if nodes.length === 0}
	<div class="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
		<div class="rounde text-white/50">Use right click to create nodes</div>
	</div>
{/if}
