<script lang="ts">
	import type { GroupNode } from '$lib/data/GroupNode.svelte.js';
	import SelectGroupButton from '../../group/SelectGroupButton.svelte';
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
			<SelectGroupButton groupNodeId={groupNode.id} />
		{/if}
	{/snippet}
</BaseNodeItem>
