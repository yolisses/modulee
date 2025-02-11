<script lang="ts">
	import type { GroupNode } from '$lib/data/GroupNode.svelte.js';
	import BaseNodeItem from '../BaseNodeItem.svelte';
	import EditGroupButton from '../EditGroupButton.svelte';

	interface Props {
		groupNode: GroupNode;
	}

	const { groupNode }: Props = $props();
</script>

<BaseNodeItem node={groupNode}>
	{#snippet preInputsChildren()}
		<div class="overflow-hidden text-ellipsis whitespace-nowrap">
			{#if groupNode.targetGroup}
				<EditGroupButton group={groupNode.targetGroup} />
			{:else}
				<button style:padding-inline="0.25lh" class="opacity-50">Select group</button>
			{/if}
		</div>
	{/snippet}
</BaseNodeItem>
