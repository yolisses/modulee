<script lang="ts">
	import { Space } from '$lib/space/Space';
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

	function getScreenPosition(space: Space, input: Input) {
		const dataDesiredPosition = viewStart;
		const screenDesiredPosition = space.getScreenPosition(dataDesiredPosition);
		const screenInputPosition = space.getScreenPosition(input.position);
		const screenPosition = screenDesiredPosition.subtract(screenInputPosition);
		return screenPosition;
	}

	const viewStart = $derived(input.connectorPosition.min(output.connectorPosition));
	const screenPosition = $derived(getScreenPosition(space, input));

	const dataSize = $derived(output.position.subtract(input.position).absolute());
</script>

<svg
	style:width={dataSize.x + 'em'}
	style:height={dataSize.y + 'em'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute bg-red-500/50"
	viewBox="{getVectorString(viewStart)} {getVectorString(dataSize)}"
>
	<WireItem startPosition={output.position} endPosition={input.position} />
</svg>
