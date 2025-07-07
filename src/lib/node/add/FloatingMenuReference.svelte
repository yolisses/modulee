<script lang="ts">
	import { getRequiredContext } from '$lib/global/getRequiredContext';
	import { spaceContextKey } from '$lib/space/spaceContext';
	import type { Vector } from 'nodes-editor';

	interface Props {
		dataPosition: Vector;
		floatingMenuReference?: HTMLElement;
	}

	let { floatingMenuReference = $bindable(), dataPosition }: Props = $props();
	const spaceContext = getRequiredContext(spaceContextKey);
	const screenPosition = $derived(spaceContext.space.getScreenPosition(dataPosition));
</script>

<div
	class="absolute"
	bind:this={floatingMenuReference}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
></div>
