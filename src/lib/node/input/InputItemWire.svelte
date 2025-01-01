<script lang="ts">
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import type { Input } from './Input.svelte';

	interface Props {
		space: Space;
		input: Input;
	}

	const { space, input }: Props = $props();

	function getScreenPosition(space: Space, input: Input) {
		const dataDesiredPosition = new Vector(0, 0);
		const screenDesiredPosition = space.getScreenPosition(dataDesiredPosition);
		const screenInputPosition = space.getScreenPosition(input.position);
		const screenPosition = screenDesiredPosition.subtract(screenInputPosition);
		return screenPosition;
	}

	const screenPosition = $derived(getScreenPosition(space, input));
</script>

<svg
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute h-10 w-10 bg-red-500/50"
></svg>
