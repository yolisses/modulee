<script lang="ts">
	import type { Node } from '$lib/types/node';

	let { node }: { node: Node } = $props();

	const zoom = 100;
</script>

<div
	style:top={node.y * zoom + 'px'}
	style:left={node.x * zoom + 'px'}
	class="absolute w-fit rounded border"
>
	{node.id}
</div>
