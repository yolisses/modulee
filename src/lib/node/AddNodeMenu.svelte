<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';

	interface Props {
		space: Space;
		position: Vector;
	}

	const { space, position }: Props = $props();

	const screenPosition = $derived(space.getScreenPosition(position.subtract(new Vector(0, 1))));
</script>

<div
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute rounded bg-zinc-600"
>
	<div class="p-2">Add Node</div>
	<hr class="opacity-50" />
	<button class="common-button">Option1</button>
	<button class="common-button">Option2</button>
	<button class="common-button">Option3</button>
	<button class="common-button">Option4</button>
</div>
