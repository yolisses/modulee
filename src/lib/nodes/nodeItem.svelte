<script lang="ts">
	import type { Node } from '$lib/types/node';

	let { node }: { node: Node } = $props();

	const zoom = 100;
	const offset = [2, 1];
</script>

<div
	style:top={(node.y + offset[1]) * zoom + 'px'}
	style:left={(node.x + offset[0]) * zoom + 'px'}
	class="absolute w-fit rounded border"
>
	{node.id}
</div>
