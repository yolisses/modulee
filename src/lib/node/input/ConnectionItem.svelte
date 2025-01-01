<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import type { Wire } from '$lib/wire/Wire';
	import WireItem from '$lib/wire/WireItem.svelte';
	import type { Input } from './Input.svelte';

	const { space, endInput, startInput }: { space: Space; startInput: Input; endInput: Input } =
		$props();

	const wire: Wire = $derived({
		startPosition: startInput.position,
		endPosition: endInput.position,
	});
</script>

<WireItem {space} {wire} />
