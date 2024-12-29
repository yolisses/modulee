<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import type { Wire } from './Wire';

	const { space, wire }: { space: Space; wire: Wire } = $props();

	const screenStartPosition = space.getScreenPosition(wire.startPosition);
	const screenEndPosition = space.getScreenPosition(wire.endPosition);
	const screenStrokeWidth = space.getScreenSize(Vector.fromNumber(0.5)).x;

	const screenPosition0 = new Vector(
		(screenStartPosition.x + screenEndPosition.x) / 2,
		screenStartPosition.y,
	);
	const screenPosition1 = new Vector(
		(screenStartPosition.x + screenEndPosition.x) / 2,
		screenEndPosition.y,
	);

	function getStringVector(vector: Vector) {
		return vector.x + ' ' + vector.y + ' ';
	}
</script>

<path
	stroke="red"
	fill="transparent"
	stroke-width={screenStrokeWidth}
	d={'M' +
		getStringVector(screenStartPosition) +
		'C' +
		getStringVector(screenPosition0) +
		getStringVector(screenPosition1) +
		getStringVector(screenEndPosition)}
/>
