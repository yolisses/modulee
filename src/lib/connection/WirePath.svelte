<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext.js';
	import { spaceContextKey } from '$lib/space/spaceContext.js';
	import { getPathD } from './getPathD.js';
	import type { WireProps } from './WireProps.js';

	const { endPosition, startPosition, isSelected, color }: WireProps & { color: string } = $props();

	const spaceContext = getRequiredContext(spaceContextKey);
	const pathD = $derived(getPathD(startPosition, endPosition, spaceContext.space));
</script>

<path d={pathD} stroke={color} fill="transparent" stroke-width="0.1lh" stroke-linecap="square" />
