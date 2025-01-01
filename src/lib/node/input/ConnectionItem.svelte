<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import type { Wire } from '$lib/wire/Wire';
	import WireItem from '$lib/wire/WireItem.svelte';
	import type { Output } from '../output/Output.svelte';
	import type { Input } from './Input.svelte';

	const { space, output, input }: { space: Space; input: Input; output: Output } = $props();

	const wire: Wire = $derived({
		endPosition: output.position,
		startPosition: input.position,
	});
</script>

<WireItem {space} {wire} />
