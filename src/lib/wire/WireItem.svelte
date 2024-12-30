<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { getVectorsString } from '$lib/utils/getVectorsString';
	import { getVectorString } from '$lib/utils/getVectorString';
	import type { Wire } from './Wire';

	const { space, wire }: { space: Space; wire: Wire } = $props();

	const screenStartPosition = $derived(space.getScreenPosition(wire.startPosition));
	const screenEndPosition = $derived(space.getScreenPosition(wire.endPosition));

	const screenMeanPosition = $derived(screenStartPosition.add(screenEndPosition).divideByNumber(2));
	const screenPosition0 = $derived(new Vector(screenMeanPosition.x, screenStartPosition.y));
	const screenPosition1 = $derived(new Vector(screenMeanPosition.x, screenEndPosition.y));
</script>

<!-- TODO consider renaming this component to Wire -->

<path
	stroke="#22c55e"
	fill="transparent"
	stroke-width="0.25em"
	d={'M' +
		getVectorString(screenStartPosition) +
		'C' +
		getVectorsString([screenPosition0, screenPosition1, screenEndPosition])}
/>
