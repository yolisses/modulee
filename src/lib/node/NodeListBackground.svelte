<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';

	let { space }: { space: Space } = $props();

	const gridSize = space.getScreenSize(Vector.one());
</script>

<div
	class="pointer-events-none absolute h-full w-full"
	style="
    background-size: {gridSize.x}px {gridSize.y}px;
    background-position: {gridSize.x / 2}px {gridSize.x / 2}px;
    background-image: radial-gradient(circle, #fff5 1px, rgba(0, 0, 0, 0) 1px);"
></div>
