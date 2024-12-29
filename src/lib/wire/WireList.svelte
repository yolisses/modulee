<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import DevUnitRectangle from './dev/DevUnitRectangle.svelte';
	import type { Wire } from './Wire';
	import WireItem from './WireItem.svelte';

	const {
		space,
		screenSize,
		dataMinimumPosition,
	}: { space: Space; screenSize: Vector; dataMinimumPosition: Vector } = $props();

	const screenMinimumPosition = space.getScreenPosition(dataMinimumPosition);

	const wire: Wire = {
		startPosition: new Vector(8.5, 9.5),
		endPosition: new Vector(8.5 + 8, 9.5 + 8),
	};
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class="pointer-events-none absolute"
	viewBox="{screenMinimumPosition.x} {screenMinimumPosition.y} {screenSize.x} {screenSize.y}"
>
	<DevUnitRectangle {space} />
	<WireItem {space} {wire} />
	<!-- wires here -->
</svg>
