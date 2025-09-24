<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { spaceContextKey } from '$lib/space/spaceContext';
	import { Vector, WireSvg } from 'nodes-editor';
	import type { Snippet } from 'svelte';
	import WirePath from './WirePath.svelte';
	import type { WireProps } from './WireProps';

	interface Props {
		children?: Snippet<[WireProps]>;
		color: string;
		endPosition: Vector;
		isSelected?: boolean;
		startPosition: Vector;
	}

	const { endPosition, startPosition, isSelected, color, children }: Props = $props();

	// Found empirically with the WirePath curve
	const dataMargin = new Vector(3, 1);
	const spaceContext = getRequiredContext(spaceContextKey);
	const screenMargin = $derived(spaceContext.space.getScreenSize(dataMargin));
</script>

<WireSvg {startPosition} {endPosition} margin={screenMargin}>
	<WirePath {startPosition} {endPosition} {isSelected} {color} />
	{@render children?.({ startPosition, endPosition, isSelected })}
</WireSvg>
