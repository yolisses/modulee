<script lang="ts">
	import { InputNode } from '$lib/data/node/InputNode.sveltevelte';
	import { ConstantNode } from '$lib/node/ConstantNode.svelte';
	import { ModuleNode } from '$lib/node/ModuleNode.svelte';
	import { Node } from '$lib/node/Node.svelte';
	import BaseNodeItem from './variants/BaseNodeItem.svelte';
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
