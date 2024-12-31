<script lang="ts">
	import type { Space } from '$lib/space/Space';
	import WireItem from '$lib/wire/WireItem.svelte';
	import { previewWireWrapper } from './previewWireWrapper.svelte';

	interface Props {
		space: Space;
	}

	const { space }: Props = $props();
</script>

{#if previewWireWrapper.previewWire}
	<WireItem {space} wire={previewWireWrapper.previewWire} />
{/if}
