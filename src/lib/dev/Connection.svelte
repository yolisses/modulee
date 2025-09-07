<script lang="ts">
	import { Vector } from 'nodes-editor';

	interface Props {
		startPosition: Vector;
		endPosition: Vector;
	}

	const { startPosition, endPosition }: Props = $props();
	const size = $derived(endPosition.subtract(startPosition).absolute());
	const min = startPosition.min(endPosition);
	const max = startPosition.max(endPosition);
</script>

{#if size}
	<svg
		class="pointer-events-none absolute"
		style:height={size.y + 'px'}
		style:width={size.x + 'px'}
		style:top={min.y + 'px'}
		style:left={min.x + 'px'}
		viewBox="{min.x} {min.y} {max.x} {max.y}"
	>
		<line x1={min.x} x2={max.x} y1={min.y} y2={max.y} stroke="red" />
	</svg>
{/if}
