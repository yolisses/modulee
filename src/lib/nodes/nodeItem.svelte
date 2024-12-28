<script lang="ts">
	import type { Space } from '$lib/space/space';
	import type { Node } from '$lib/types/node';

	let { node, space }: { node: Node; space: Space } = $props();

	const screenPosition = space.getScreenPosition(node.position);
	const screenSize = space.getScreenSize(node.size);
</script>

<div
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute w-fit rounded border"
>
	{node.id}
</div>
