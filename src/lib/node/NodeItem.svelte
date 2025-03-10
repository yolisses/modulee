<script lang="ts">
	import { ConstantNode } from '$lib/data/ConstantNode.svelte';
	import { ModuleNode } from '$lib/data/ModuleNode.svelte';
	import { Node } from '$lib/data/Node.svelte';
	import BaseNodeItem from './BaseNodeItem.svelte';
	import ConstantNodeItem from './variants/ConstantNodeItem.svelte';
	import ModuleNodeItem from './variants/ModuleNodeItem.svelte';

	interface Props {
		node: Node;
	}
	const { node }: Props = $props();
</script>

{#if node instanceof ModuleNode}
	<ModuleNodeItem moduleNode={node} />
{:else if node instanceof ConstantNode}
	<ConstantNodeItem constantNode={node} />
{:else}
	<BaseNodeItem {node} />
{/if}
