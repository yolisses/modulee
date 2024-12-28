<script lang="ts">
	import type { Editor } from '$lib/editor/editor';
	import { OffsetConverter } from '$lib/space/offsetConverter';
	import { Space } from '$lib/space/space';
	import { Vector } from '$lib/space/vector';
	import { ZoomConverter } from '$lib/space/zoomConverter';
	import NodeItem from './nodeItem.svelte';

	let { editor }: { editor: Editor } = $props();

	const space = new Space([new OffsetConverter(new Vector(2, 1)), new ZoomConverter(100)]);
</script>

<div class="min-w-screen relative min-h-screen border">
	{#each editor.nodes as node}
		<NodeItem {node} {space} {editor} />
	{/each}
</div>
