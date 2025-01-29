<script lang="ts">
	import { getSpaceContext } from '$lib/space/spaceContext';
	import { Vector, WireSvg } from 'nodes-editor';
	import WirePath from './WirePath.svelte';
	import type { WireProps } from './WireProps.js';

	const { endPosition, startPosition }: WireProps = $props();

	const spaceContext = getSpaceContext();
	// Found empirically with the WirePath curve
	const dataMargin = new Vector(3, 1);
	const screenMargin = spaceContext.space.getScreenSize(dataMargin);
</script>

<WireSvg {startPosition} {endPosition} margin={screenMargin}>
	<WirePath {startPosition} {endPosition} {space} />
</WireSvg>
