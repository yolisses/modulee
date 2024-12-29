<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import DevUnitRectangle from './dev/DevUnitRectangle.svelte';

	const {
		space,
		screenSize,
		dataMinimumPosition,
	}: { space: Space; screenSize: Vector; dataMinimumPosition: Vector } = $props();

	const screenMinimumPosition = space.getScreenPosition(dataMinimumPosition);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class="absolute"
	viewBox="{screenMinimumPosition.x} {screenMinimumPosition.y} {screenSize.x} {screenSize.y}"
>
	<DevUnitRectangle {space} />
	<!-- wires here -->
</svg>
