<script lang="ts">
	import { Space } from '$lib/space/Space';
	import Wire from '$lib/wire/Wire.svelte';
	import DevUnitDiv from '../dev/DevUnitDiv.svelte';
	import type { Output } from '../output/Output.svelte';
	import type { Input } from './Input.svelte';

	interface Props {
		space: Space;
		input: Input;
		output: Output;
	}

	const { space, input, output }: Props = $props();

	const startPosition = $derived(output.connectorPosition);
	const endPosition = $derived(input.connectorPosition);

	const screenInputPosition = $derived(space.getScreenPosition(input.position));
</script>

<!-- {startPosition} {endPosition} -->
<div
	class="absolute"
	style:top={-screenInputPosition.y + 'px'}
	style:left={-screenInputPosition.x + 'px'}
>
	<DevUnitDiv {space} />
	<Wire {space} {startPosition} {endPosition} />
</div>
