<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter';
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { ZoomConverter } from '$lib/space/ZoomConverter';
	import NodeItem from './NodeItem.svelte';

	let { editor }: { editor: Editor } = $props();

	const space = new Space([new OffsetConverter(new Vector(2, 1)), new ZoomConverter(100)]);
</script>

<div class="min-w-screen relative min-h-screen border">
	{#each editor.nodes as node (node.id)}
		<NodeItem {node} {space} {editor} />
	{/each}
</div>
