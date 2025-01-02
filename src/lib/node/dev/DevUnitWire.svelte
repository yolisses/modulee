<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';

	import Wire from '$lib/wire/Wire.svelte';

	interface Props {
		space: Space;
	}

	const { space }: Props = $props();
</script>

<Wire {space} startPosition={new Vector(0, 0)} endPosition={new Vector(1, 1)} />
