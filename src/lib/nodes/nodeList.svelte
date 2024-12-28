<script lang="ts">
	import NodeItem from './nodeItem.svelte';
	import type { Node } from '$lib/types/node';
	import { Space } from '$lib/space/space';
	import { OffsetConverter } from '$lib/space/offsetConverter';
	import { ZoomConverter } from '$lib/space/zoomConverter';
	import { Vector } from '$lib/space/vector';

	let { nodes }: { nodes: Node[] } = $props();

	const space = new Space([new OffsetConverter(new Vector(1, 0)), new ZoomConverter(100)]);
</script>

<div class="min-w-screen relative min-h-screen border">
	{#each nodes as node}
		<NodeItem {node} {space} />
	{/each}
</div>
