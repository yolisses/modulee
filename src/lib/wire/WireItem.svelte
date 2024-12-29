<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { getVectorsString } from '$lib/utils/getVectorsString';
	import { getVectorString } from '$lib/utils/getVectorString';
	import type { Wire } from './Wire';

	const { space, wire }: { space: Space; wire: Wire } = $props();

	const screenStartPosition = space.getScreenPosition(wire.startPosition);
	const screenEndPosition = space.getScreenPosition(wire.endPosition);
	const screenStrokeWidth = space.getScreenSize(Vector.fromNumber(0.25)).x;

	const screenPosition0 = new Vector(
		(screenStartPosition.x + screenEndPosition.x) / 2,
		screenStartPosition.y,
	);
	const screenPosition1 = new Vector(
		(screenStartPosition.x + screenEndPosition.x) / 2,
		screenEndPosition.y,
	);
</script>

<path
	stroke="#22c55e"
	fill="transparent"
	stroke-width={screenStrokeWidth}
	d={'M' +
		getVectorString(screenStartPosition) +
		'C' +
		getVectorsString([screenPosition0, screenPosition1, screenEndPosition])}
/>
