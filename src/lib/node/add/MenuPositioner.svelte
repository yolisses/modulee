<script lang="ts">
	import type { Vector } from 'nodes-editor';

	interface Props {
		screenPosition: Vector;
	}

	const { screenPosition }: Props = $props();
</script>

<div
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute"
></div>
