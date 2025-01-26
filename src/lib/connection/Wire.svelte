<script lang="ts">
	import { Vector, WireSvg } from 'nodes-editor';
	import WirePath from './WirePath.svelte';
	import type { WireProps } from './WireProps.js';

	const { endPosition, startPosition, space }: WireProps = $props();

	// Found empirically with the WirePath curve
	const dataMargin = new Vector(3, 1);
	const screenMargin = space.getScreenSize(dataMargin);
</script>

<WireSvg {startPosition} {endPosition} margin={screenMargin}>
	<WirePath {startPosition} {endPosition} {space} />
</WireSvg>
