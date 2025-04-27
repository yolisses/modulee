<script lang="ts">
	import { ConstantNode } from '$lib/data/ConstantNode.svelte';
	import { InputNode } from '$lib/data/InputNode.svelte';
	import { ModuleNode } from '$lib/data/ModuleNode.svelte';
	import { Node } from '$lib/data/Node.svelte';
	import BaseNodeItem from './BaseNodeItem.svelte';
	import ConstantNodeItem from './variants/ConstantNodeItem.svelte';
	import InputNodeItem from './variants/InputNodeItem.svelte';
	import ModuleNodeItem from './variants/ModuleNodeItem.svelte';

	interface Props {
		node: Node;
	}
	const { node }: Props = $props();
</script>

{#if node instanceof InputNode}
	<InputNodeItem inputNode={node} />
{:else if node instanceof ModuleNode}
	<ModuleNodeItem moduleNode={node} />
{:else if node instanceof ConstantNode}
	<ConstantNodeItem constantNode={node} />
{:else}
	<BaseNodeItem {node} />
{/if}
