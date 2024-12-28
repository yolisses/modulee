<script lang="ts">
	import type { Space } from '$lib/space/space';
	import type { Node } from '$lib/types/node';

	let { node, space }: { node: Node; space: Space } = $props();

	const screenPosition = space.getScreenPosition(node.position);
	const screenSize = space.getScreenSize(node.size);

	function handleClick(e: MouseEvent) {
		console.log('here');
	}
</script>

<button
	onclick={handleClick}
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute w-fit bg-gray-500"
>
	{node.id}
</button>
