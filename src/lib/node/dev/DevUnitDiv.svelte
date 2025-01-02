<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';

	interface Props {
		space: Space;
		text?: string;
	}

	const { space, text }: Props = $props();

	const screenPosition = $derived(space.getScreenPosition(Vector.zero()));
	const screenSize = $derived(space.getScreenSize(Vector.one()));
</script>

<div
	id="DevUnitDiv"
	class="pointer-events-none absolute whitespace-nowrap bg-blue-500/50 text-purple-500"
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
>
	{text}
</div>
