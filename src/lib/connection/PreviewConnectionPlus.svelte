<script lang="ts">
	import type { Vector } from 'nodes-editor';

	interface Props {
		position: Vector;
	}

	const { position }: Props = $props();

	const long = 12;
	const short = 3;
	const rounded = 2;
	const offset = 16;
</script>

<rect
	rx={rounded}
	fill="white"
	width="{short}px"
	height="{long}px"
	x={position.x - offset}
	y={position.y - offset - long / 2 + short / 2}
></rect>
<rect
	rx={rounded}
	fill="white"
	width="{long}px"
	height="{short}px"
	x={position.x - offset - long / 2 + short / 2}
	y={position.y - offset}
></rect>
