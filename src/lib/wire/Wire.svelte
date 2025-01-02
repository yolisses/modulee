<script lang="ts">
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { getVectorString } from '$lib/utils/getVectorString';
	import WirePath from '$lib/wire/WirePath.svelte';

	interface Props {
		space: Space;
		endPosition: Vector;
		startPosition: Vector;
	}

	const { space, startPosition, endPosition }: Props = $props();

	// Based on experiments with the WirePath curve
	// const margin = new Vector(2, 1);
	const margin = new Vector(2, 1);

	const viewStart = $derived(startPosition.min(endPosition).subtract(margin));
	const screenPosition = $derived(space.getScreenPosition(viewStart));

	const viewSize = $derived(
		endPosition.subtract(startPosition).absolute().add(margin.multiplyByNumber(2)),
	);
	const screenSize = $derived(space.getScreenSize(viewSize));
</script>

<!-- style:background-color="#f008" -->
<svg
	class="pointer-events-none absolute"
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	viewBox="{getVectorString(viewStart)} {getVectorString(viewSize)}"
>
	<WirePath {startPosition} {endPosition} />
</svg>
