<script lang="ts">
	import { Vector } from 'nodes-editor';

	interface Props {
		startPosition: Vector;
		endPosition: Vector;
	}

	const { startPosition, endPosition }: Props = $props();
	const min = $derived(startPosition.min(endPosition));
	const max = $derived(startPosition.max(endPosition));
	const size = $derived(max.subtract(min));
</script>

{#if size}
	<svg
		class="pointer-events-none absolute"
		style:height={size.y + 'px'}
		style:left={min.x + 'px'}
		style:top={min.y + 'px'}
		style:width={size.x + 'px'}
		viewBox="{min.x} {min.y} {size.x} {size.y}"
	>
		<line
			stroke="red"
			x1={startPosition.x}
			x2={endPosition.x}
			y1={startPosition.y}
			y2={endPosition.y}
		/>
	</svg>
{/if}
