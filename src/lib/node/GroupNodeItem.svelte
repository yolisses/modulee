<script lang="ts">
	import type { GroupNode } from '$lib/data/GroupNode.svelte.js';
	import EditGroupButton from './EditGroupButton.svelte';
	import NodeItem from './NodeItem.svelte';

	interface Props {
		groupNode: GroupNode;
	}

	const { groupNode }: Props = $props();
</script>

<NodeItem node={groupNode}>
	<div
		class="block overflow-hidden text-ellipsis whitespace-nowrap rounded bg-zinc-800"
		style:padding={0.25 + 'lh'}
		style:margin={0.25 + 'lh'}
	>
		{#if groupNode.targetGroup}
			{groupNode.targetGroup.name}
		{:else}
			<div class="opacity-50">Select group</div>
		{/if}
	</div>
	{#snippet headerChildren()}
		{#if groupNode.targetGroup}
			<EditGroupButton group={groupNode.targetGroup} />
		{/if}
	{/snippet}
</NodeItem>
