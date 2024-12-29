<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { getVectorStringPx } from '$lib/wire/utils/getVectorStringPx';

	let { space }: { space: Space } = $props();

	const gridSize = space.getScreenSize(Vector.one());
</script>

<div
	class="pointer-events-none absolute h-full w-full"
	style="
    background-size: {getVectorStringPx(gridSize)};
    background-position: {getVectorStringPx(gridSize.divide(Vector.fromNumber(2)))};
    background-image: radial-gradient(circle, #fff5 1px, rgba(0, 0, 0, 0) 1px);"
></div>
