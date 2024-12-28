<script lang="ts">
	import type { Space } from '$lib/space/space';
	import type { Node } from '$lib/types/node';

	let { node, space }: { node: Node; space: Space } = $props();
	const screenPosition = space.getScreenPosition(node.position);
</script>

<div
	style:left={screenPosition.x + 'px'}
	style:top={screenPosition.y + 'px'}
	class="absolute w-fit rounded border"
>
	{node.id}
</div>
