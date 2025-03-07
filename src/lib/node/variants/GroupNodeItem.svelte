<script lang="ts">
	import type { GroupNode } from '$lib/data/GroupNode.svelte.js';
	import SetTargetGroupButton from '../../group/SetTargetGroupButton.svelte';
	import BaseNodeItem from '../BaseNodeItem.svelte';
	import EditGroupButton from '../EditGroupButton.svelte';

	interface Props {
		groupNode: GroupNode;
	}

	const { groupNode }: Props = $props();
</script>

<BaseNodeItem node={groupNode}>
	{#snippet preInputsChildren()}
		{#if groupNode.targetGroup}
			<EditGroupButton group={groupNode.targetGroup} />
		{:else}
			<SetTargetGroupButton groupNodeId={groupNode.id} />
		{/if}
	{/snippet}
</BaseNodeItem>
