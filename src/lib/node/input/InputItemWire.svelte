<script lang="ts">
	import { Space } from '$lib/space/Space';
	import Wire from '$lib/wire/Wire.svelte';
	import type { Output } from '../output/Output.svelte';
	import type { Input } from './Input.svelte';

	interface Props {
		space: Space;
		input: Input;
		output: Output;
	}

	const { space, input, output }: Props = $props();

	const startPosition = $derived(output.jointPosition);
	const endPosition = $derived(input.jointPosition);

	const screenInputPosition = $derived(space.getScreenPosition(input.position));
</script>

<!-- Prevents input offset -->
<div
	class="absolute"
	style:top={-screenInputPosition.y + 'px'}
	style:left={-screenInputPosition.x + 'px'}
>
	<Wire {space} {startPosition} {endPosition} />
</div>
