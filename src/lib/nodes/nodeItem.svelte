<script lang="ts">
	import type { Node } from '$lib/types/node';

	let { node }: { node: Node } = $props();

	const zoom = 100;
</script>

<div class="absolute w-fit rounded border" style="left: {node.x * zoom}px; top: {node.y * zoom}px;">
	{node.id}
</div>
