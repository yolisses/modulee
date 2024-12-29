<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';

	const { space }: { space: Space } = $props();

	const screenOneSize = space.getScreenSize(Vector.one());
	const screenZeroPosition = space.getScreenPosition(Vector.zero());
</script>

<rect
	fill="blue"
	x={screenZeroPosition.x}
	y={screenZeroPosition.y}
	width={screenOneSize.x}
	height={screenOneSize.y}
/>
