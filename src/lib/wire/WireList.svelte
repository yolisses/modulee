<script lang="ts">
	import { getElementScreenSize } from '$lib/node/getElementScreenSize';
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { getVectorsString } from '$lib/utils/getVectorsString';
	import { onMount } from 'svelte';
	import DevUnitRectangle from './dev/DevUnitRectangle.svelte';
	import type { Wire } from './Wire';
	import WireItem from './WireItem.svelte';

	let element: Element;
	let screenSize = $state(Vector.zero());

	const { space, dataMinimumPosition }: { space: Space; dataMinimumPosition: Vector } = $props();

	const screenMinimumPosition = space.getScreenPosition(dataMinimumPosition);

	const wire: Wire = {
		startPosition: new Vector(8.5, 9.5),
		endPosition: new Vector(8.5 + 8, 9.5 + 8),
	};

	onMount(() => {
		function updateScreenSize() {
			screenSize = getElementScreenSize(element);
		}
		const resizeObserver = new ResizeObserver(updateScreenSize);
		resizeObserver.observe(element);
		return () => resizeObserver.disconnect();
	});
</script>

<svg
	bind:this={element}
	xmlns="http://www.w3.org/2000/svg"
	class="pointer-events-none absolute h-full w-full"
	viewBox={getVectorsString([screenMinimumPosition, screenSize])}
>
	<DevUnitRectangle {space} />
	<WireItem {space} {wire} />
	<!-- wires here -->
</svg>
