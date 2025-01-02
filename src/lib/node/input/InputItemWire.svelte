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

	const startPosition = $derived(output.connectorPosition);
	const endPosition = $derived(input.connectorPosition);
</script>

<!-- <div class="relative" style:left={input.position + 'em'}> -->
<Wire {space} {startPosition} {endPosition} />
<!-- </div> -->
