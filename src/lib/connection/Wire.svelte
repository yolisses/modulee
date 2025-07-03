<script lang="ts">
	import { Vector, WireSvg } from 'nodes-editor';
	import WirePath from './WirePath.svelte';
	import type { WireProps } from './WireProps.js';

	const { endPosition, startPosition, isSelected }: WireProps = $props();

	// Found empirically with the WirePath curve
	const dataMargin = new Vector(3, 1);
	const spaceContext = getRequiredContext(spaceContextKey);
	const screenMargin = $derived(spaceContext.space.getScreenSize(dataMargin));
</script>

<WireSvg {startPosition} {endPosition} margin={screenMargin}>
	<WirePath {startPosition} {endPosition} {isSelected} />
</WireSvg>
