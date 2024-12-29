<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import TestUnitRectangle from './TestUnitRectangle.svelte';

	const {
		space,
		screenSize,
		dataMinimumPosition,
	}: { space: Space; screenSize: Vector; dataMinimumPosition: Vector } = $props();

	const screenMinimumPosition = space.getScreenPosition(dataMinimumPosition);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class="absolute border border-red-500"
	viewBox="{screenMinimumPosition.x} {screenMinimumPosition.y} {screenSize.x} {screenSize.y}"
>
	<TestUnitRectangle {space} />
	<!-- wires here -->
</svg>
