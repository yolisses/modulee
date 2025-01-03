<script lang="ts">
	import { Vector } from '$lib/space/Vector';
	import { devNodeTypes } from './devNodeTypes';
	import NodeTypeList from './NodeTypeList.svelte';

	interface Props {
		screenPosition: Vector;
	}

	const { screenPosition: screenInitialPosition }: Props = $props();
	const screenOffset = new Vector(2, 56);
	const screenPosition = $derived(screenInitialPosition.subtract(screenOffset));
</script>

<div
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute rounded bg-zinc-600"
>
	<div class="p-2">Add Node</div>
	<hr class="opacity-50" />
	<NodeTypeList nodeTypes={devNodeTypes} />
</div>
