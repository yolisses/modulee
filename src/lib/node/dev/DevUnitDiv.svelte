<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import { Vector } from '$lib/space/Vector';

	interface Props {
		space: Space;
	}

	const { space }: Props = $props();

	const screenPosition = space.getScreenPosition(Vector.zero());
	const screenSize = space.getScreenSize(Vector.one());
</script>

<div
	id="DevUnitDiv"
	class="absolute bg-blue-500/50"
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
></div>
