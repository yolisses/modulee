<script lang="ts">
	import { getSpaceContext } from '$lib/space/spaceContext.js';
	import { getPathD } from './getPathD.js';
	import type { WireProps } from './WireProps.js';

	const { endPosition, startPosition }: WireProps = $props();

	const spaceContext = getSpaceContext();
	const pathD = $derived(getPathD(startPosition, endPosition, spaceContext.space));
</script>

<path d={pathD} stroke="#14532d" fill="transparent" stroke-width="0.25lh" />
<path d={pathD} stroke="#22c55e" fill="transparent" stroke-width="0.15lh" stroke-linecap="square" />
