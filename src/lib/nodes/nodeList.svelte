<script lang="ts">
	import NodeItem from './nodeItem.svelte';
	import type { Node } from '$lib/types/node';

	let { nodes }: { nodes: Node[] } = $props();
</script>

<div class="relative h-screen w-screen border">
	{#each nodes as node}
		<NodeItem {node} />
	{/each}
</div>
