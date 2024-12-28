<script lang="ts">
	import NodeItem from './nodeItem.svelte';
	import type { Node } from '$lib/types/node';
	import { Space } from '$lib/space/space';
	import { OffsetConverter } from '$lib/space/offsetConverter';
	import { ZoomConverter } from '$lib/space/zoomConverter';

	let { nodes }: { nodes: Node[] } = $props();

	const space = new Space([new OffsetConverter({ x: 2, y: 1 }), new ZoomConverter(100)]);
</script>

<div class="relative h-screen w-screen border">
	{#each nodes as node}
		<NodeItem {node} {space} />
	{/each}
</div>
