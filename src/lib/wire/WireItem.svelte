<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import type { Wire } from './Wire';

	const { space, wire }: { space: Space; wire: Wire } = $props();

	const screenStartPosition = space.getScreenPosition(wire.startPosition);
	const screenEndPosition = space.getScreenPosition(wire.endPosition);
	const screenStrokeWidth = space.getScreenSize(Vector.fromNumber(0.5)).x;
</script>

<path
	stroke="red"
	stroke-width={screenStrokeWidth}
	d="M{screenStartPosition.x} {screenStartPosition.y} L{screenEndPosition.x} {screenEndPosition.y}"
/>
