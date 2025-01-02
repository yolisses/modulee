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
	const margin = new Vector(0, 0);

	const viewStart = $derived(startPosition.min(endPosition).subtract(margin));
	const dataPosition = $derived(space.getDataPosition(startPosition.min(endPosition)));

	const dataSize = $derived(
		endPosition.subtract(startPosition).absolute().add(margin.multiplyByNumber(2)),
	);
</script>

<svg
	style:background-color="#f008"
	style:width={dataSize.x + 'em'}
	style:height={dataSize.y + 'em'}
	style:top={dataPosition.y + 'em'}
	style:left={dataPosition.x + 'em'}
	class="pointer-events-none absolute"
	viewBox="{getVectorString(viewStart)} {getVectorString(dataSize)}"
>
	<WirePath {startPosition} {endPosition} />
</svg>
