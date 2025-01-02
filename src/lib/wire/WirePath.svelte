<script lang="ts">
	import { Vector } from '$lib/space/Vector';
	import { getVectorsString } from '$lib/utils/getVectorsString';
	import { getVectorString } from '$lib/utils/getVectorString';

	interface Props {
		startPosition: Vector;
		endPosition: Vector;
	}
	const { startPosition, endPosition }: Props = $props();

	const pathD = $derived(getPathD(startPosition, endPosition));

	function clamp(value: number, min: number, max: number) {
		if (value > max) return max;
		if (value < min) return min;
		return value;
	}

	function getPathD(start: Vector, end: Vector) {
		let offsetX = (end.x - start.x) / 2;
		if (offsetX < 0) {
			offsetX *= 5;
		}
		offsetX = clamp(offsetX, -5, 5);
		offsetX = Math.abs(offsetX);
		offsetX = Math.min(offsetX, 10);

		const point0 = new Vector(start.x + offsetX, start.y);
		const point1 = new Vector(end.x - offsetX, end.y);

		return (
			'M' + getVectorString(startPosition) + 'C' + getVectorsString([point0, point1, endPosition])
		);
	}
</script>

<path d={pathD} class="stroke-green-900" fill="transparent" stroke-width="0.3" />
<path d={pathD} class="stroke-green-500" fill="transparent" stroke-width="0.2" />
