<script lang="ts">
	import { getElementScreenSize } from '$lib/node/getElementScreenSize';
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { getVectorsString } from '$lib/utils/getVectorsString';
	import { onMount } from 'svelte';

	interface Props {
		space: Space;
		children?: any;
		dataMinimumPosition: Vector;
	}

	let { space, dataMinimumPosition, children }: Props = $props();

	let element: Element;
	let screenSize = $state(Vector.zero());

	const screenMinimumPosition = $derived(space.getScreenPosition(dataMinimumPosition));

	onMount(() => {
		function updateScreenSize() {
			screenSize = getElementScreenSize(element);
		}
		const resizeObserver = new ResizeObserver(updateScreenSize);
		resizeObserver.observe(element);
		return () => resizeObserver.disconnect();
	});
</script>

<!-- TODO consider renaming this component to something more 
 general -->

<svg
	bind:this={element}
	xmlns="http://www.w3.org/2000/svg"
	class="pointer-events-none absolute h-full w-full"
	viewBox={getVectorsString([screenMinimumPosition, screenSize])}
>
	{@render children?.()}
</svg>
