<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';

	const { space, position, size }: { space: Space; position: Vector; size: Vector } = $props();

	const screenOneSize = space.getScreenSize(size);
	const screenZeroPosition = space.getScreenPosition(position);
</script>

<rect
	fill="blue"
	x={screenZeroPosition.x}
	y={screenZeroPosition.y}
	width={screenOneSize.x}
	height={screenOneSize.y}
/>
