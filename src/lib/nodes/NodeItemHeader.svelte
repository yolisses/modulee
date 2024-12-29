<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import type { Node } from './Node';

	const { node, space }: { node: Node; space: Space } = $props();
	const lineHeight = space.getScreenSize(Vector.one()).y;
	const fontSize = space.getScreenSize(Vector.fromNumber(2 / 3)).y;
</script>

<div style="font-size: {fontSize}px; line-height: {lineHeight}px;">
	<!-- TODO change to node.type -->
	{node.id}
</div>
