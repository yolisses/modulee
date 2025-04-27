<script lang="ts">
	import type { InputNode } from '$lib/data/InputNode.svelte';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import BaseNodeItem from '../BaseNodeItem.svelte';

	interface Props {
		inputNode: InputNode;
	}

	const { inputNode }: Props = $props();
</script>

<BaseNodeItem node={inputNode}>
	{#snippet preInputsChildren()}
		<button class="hover-bg flex flex-row items-center" title="Edit input node">
			<div class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
				{inputNode.name}
			</div>
			<Fa icon={faEdit} title="Replace module" style="padding-inline: 0.25lh;" />
		</button>
	{/snippet}
</BaseNodeItem>
