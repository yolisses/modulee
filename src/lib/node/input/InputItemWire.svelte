<script lang="ts">
	import { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';
	import type { Input } from './Input.svelte';

	interface Props {
		space: Space;
		input: Input;
	}

	const { space, input }: Props = $props();

	const desiredPosition = new Vector(0, 0);
	const screenInputPosition = space.getScreenPosition(input.position);
	const dataPosition = desiredPosition.subtract(input.position);
	const screenPosition = space.getScreenPosition(dataPosition);

	console.log(desiredPosition, screenInputPosition, dataPosition, screenPosition);
</script>

<svg
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute h-10 w-10 bg-red-500/50"
></svg>
