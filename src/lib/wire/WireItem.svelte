<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { getVectorsString } from '$lib/utils/getVectorsString';
	import { getVectorString } from '$lib/utils/getVectorString';
	import type { Wire } from './Wire';

	const { space, wire }: { space: Space; wire: Wire } = $props();

	const pathD = $derived(getPathD(wire.startPosition, wire.endPosition));

	function clamp(value: number, min: number, max: number) {
		if (value > max) return max;
		if (value < min) return min;
		return value;
	}

	function getPathD(start: Vector, end: Vector) {
		let offsetX = (end.x - start.x) / 2;
		offsetX = clamp(offsetX, -10, 10);
		offsetX = Math.abs(offsetX);
		offsetX = Math.min(offsetX, 10);

		const point0 = new Vector(start.x + offsetX, start.y);
		const point1 = new Vector(end.x - offsetX, end.y);

		const screenEnd = space.getScreenPosition(end);
		const screenStart = space.getScreenPosition(start);
		const screenPoint0 = space.getScreenPosition(point0);
		const screenPoint1 = space.getScreenPosition(point1);

		return (
			'M' +
			getVectorString(screenStart) +
			'C' +
			getVectorsString([screenPoint0, screenPoint1, screenEnd])
		);
	}
</script>

<!-- TODO consider renaming this component to Wire -->

<path d={pathD} stroke="#22c55e" fill="transparent" stroke-width="0.25em" />
