<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';

	interface Props {
		space: Space;
		text?: string;
		parentPosition: Vector;
	}

	const { space, text, parentPosition }: Props = $props();

	const screenSize = $derived(space.getScreenSize(Vector.one()));
	const screenPosition = $derived(
		space.getScreenPosition(Vector.zero()).subtract(space.getScreenPosition(parentPosition)),
	);
</script>

<div
	id="DevUnitDiv"
	class="absolute whitespace-nowrap bg-blue-500/50 text-purple-500"
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
>
	{text}
</div>
