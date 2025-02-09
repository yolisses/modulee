<script lang="ts">
	import type { Input } from '$lib/data/Input.svelte.js';
	import { ConnectionItem, Vector } from 'nodes-editor';
	import Wire from './Wire.svelte';

	interface Props {
		input: Input;
	}

	const { input }: Props = $props();
</script>

{#if input.connectedOutput?.id}
	<ConnectionItem
		connection={{
			endConnectorId: input.id,
			id: input.id + 'connectedOutput',
			startConnectorId: input.connectedOutput.id,
		}}
	>
		{#snippet children({
			endPosition,
			startPosition,
		}: {
			endPosition: Vector;
			startPosition: Vector;
		})}
			<Wire {startPosition} {endPosition} />
		{/snippet}
	</ConnectionItem>
{/if}
