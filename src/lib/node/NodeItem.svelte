<script lang="ts">
	import { ConstantNode } from '$lib/data/ConstantNode.svelte';
	import { GroupNode } from '$lib/data/GroupNode.svelte';
	import { Node } from '$lib/data/Node.svelte';
	import BaseNodeItem from './BaseNodeItem.svelte';
	import ConstantNodeItem from './variants/ConstantNodeItem.svelte';
	import GroupNodeItem from './variants/GroupNodeItem.svelte';

	interface Props {
		node: Node;
	}
	const { node }: Props = $props();
</script>

{#if node instanceof GroupNode}
	<GroupNodeItem groupNode={node} />
{:else if node instanceof ConstantNode}
	<ConstantNodeItem constantNode={node} />
{:else}
	<BaseNodeItem {node} />
{/if}
