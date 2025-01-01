<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import WireItem from '$lib/wire/WireItem.svelte';
	import { getPreviewConnectionContext } from './previewConnectionContext';

	interface Props {
		space: Space;
	}

	const { space }: Props = $props();

	const previewConnectionWrapper = getPreviewConnectionContext();
</script>

{#if previewConnectionWrapper.previewConnection}
	<WireItem
		{space}
		wire={{
			startPosition: previewConnectionWrapper.previewConnection.input.position,
			endPosition:
				previewConnectionWrapper.previewConnection.output?.position ??
				previewConnectionWrapper.previewConnection.dataPointerPosition,
		}}
	/>
{/if}
