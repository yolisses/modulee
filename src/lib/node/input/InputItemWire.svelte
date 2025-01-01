<script lang="ts">
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import { getVectorString } from '$lib/utils/getVectorString';
	import WireItem from '$lib/wire/WireItem.svelte';
	import type { Output } from '../output/Output.svelte';
	import type { Input } from './Input.svelte';

	interface Props {
		space: Space;
		input: Input;
		output: Output;
	}

	const { space, input, output }: Props = $props();

	// Based on experiments with the Wire curve
	const margin = new Vector(2, 0);

	function getScreenPosition(space: Space, input: Input) {
		const dataDesiredPosition = viewStart;
		const screenDesiredPosition = space.getScreenPosition(dataDesiredPosition);
		const screenInputPosition = space.getScreenPosition(input.connectorPosition);
		const screenPosition = screenDesiredPosition.subtract(screenInputPosition);
		return screenPosition;
	}

	const viewStart = $derived(
		input.connectorPosition.min(output.connectorPosition).subtract(margin),
	);
	const screenPosition = $derived(getScreenPosition(space, input));

	const dataSize = $derived(
		output.position
			.subtract(input.position)
			.absolute()
			.add(margin.multiplyByNumber(2))
			.add(Vector.one()),
	);
</script>

<svg
	style:width={dataSize.x + 'em'}
	style:height={dataSize.y + 'em'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="pointer-events-none absolute"
	viewBox="{getVectorString(viewStart.subtract(Vector.one()))} {getVectorString(dataSize)}"
>
	<WireItem startPosition={output.position} endPosition={input.position} />
</svg>
