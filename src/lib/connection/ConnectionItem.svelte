<script lang="ts">
	import type { Input } from '$lib/data/Input.svelte.js';
	import type { Space } from '$lib/space/Space.js';
	import { ConnectionItem, Vector } from 'nodes-editor';
	import Wire from './Wire.svelte';

	interface Props {
		input: Input;
		space: Space;
	}

	const { input, space }: Props = $props();
</script>

{#if input.connectedOutputId}
	<ConnectionItem
		connection={{
			endConnectorId: input.id,
			id: input.id + 'connectedOutput',
			startConnectorId: input.connectedOutputId,
		}}
	>
		{#snippet children({
			endPosition,
			startPosition,
		}: {
			endPosition: Vector;
			startPosition: Vector;
		})}
			<Wire {startPosition} {endPosition} {space} />
		{/snippet}
	</ConnectionItem>
{/if}
