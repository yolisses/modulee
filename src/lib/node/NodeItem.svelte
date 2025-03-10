<script lang="ts">
	import { ConstantNode } from '$lib/data/ConstantNode.svelte';
	import { InternalModuleNode } from '$lib/data/InternalModuleNode.svelte';
	import { Node } from '$lib/data/Node.svelte';
	import BaseNodeItem from './BaseNodeItem.svelte';
	import ConstantNodeItem from './variants/ConstantNodeItem.svelte';
	import InternalModuleNodeItem from './variants/InternalModuleNodeItem.svelte';

	interface Props {
		node: Node;
	}
	const { node }: Props = $props();
</script>

{#if node instanceof InternalModuleNode}
	<InternalModuleNodeItem internalModuleNode={node} />
{:else if node instanceof ConstantNode}
	<ConstantNodeItem constantNode={node} />
{:else}
	<BaseNodeItem {node} />
{/if}
