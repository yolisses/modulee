<script lang="ts">
	import type { GroupNode } from '$lib/data/GroupNode.svelte.js';
	import SetTargetGroupButton from '../../group/SetTargetGroupButton.svelte';
	import BaseNodeItem from '../BaseNodeItem.svelte';
	import TargetGroupButton from '../TargetGroupButton.svelte';

	interface Props {
		groupNode: GroupNode;
	}

	const { groupNode }: Props = $props();
</script>

<BaseNodeItem node={groupNode}>
	{#snippet preInputsChildren()}
		{#if groupNode.targetGroup}
			<TargetGroupButton {groupNode} targetGroup={groupNode.targetGroup} />
		{:else}
			<SetTargetGroupButton groupNodeId={groupNode.id}>
				<div class="opacity-50" style:padding-inline="0.25lh">Set group</div>
			</SetTargetGroupButton>
		{/if}
	{/snippet}
</BaseNodeItem>
