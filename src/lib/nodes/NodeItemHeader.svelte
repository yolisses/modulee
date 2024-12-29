<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { getScreenFontSize } from '$lib/utils/getScreenFontSize';
	import type { Node } from './Node';

	const { node, space }: { node: Node; space: Space } = $props();
	const fontSize = getScreenFontSize(space);
	const lineHeight = getScreenFontSize(space);
</script>

<div style="font-size: {fontSize}px; line-height: {lineHeight}px;">
	<!-- TODO change to node.type -->
	{node.id}
</div>
