<script lang="ts">
	import { ConstantNode } from '$lib/node/ConstantNode';
	import { ModuleNode } from '$lib/node/ModuleNode.svelte';
	import { Node } from '$lib/node/Node.svelte';
	import { InputNode } from '../InputNode';
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
