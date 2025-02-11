<script lang="ts">
	import type { GroupNode } from '$lib/data/GroupNode.svelte.js';
	import { faEdit } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import BaseNodeItem from '../BaseNodeItem.svelte';
	import EditGroupButton from '../EditGroupButton.svelte';

	interface Props {
		groupNode: GroupNode;
	}

	const { groupNode }: Props = $props();
</script>

<BaseNodeItem node={groupNode}>
	{#snippet preInputsChildren()}
		<div>
			{#if groupNode.targetGroup}
				<div class="flex flex-row overflow-hidden text-ellipsis whitespace-nowrap">
					<EditGroupButton group={groupNode.targetGroup} />
					<button class="hover-bg whitespace-nowrap">
						<Fa icon={faEdit} />
					</button>
				</div>
			{/if}
		</div>
	{/snippet}
</BaseNodeItem>
